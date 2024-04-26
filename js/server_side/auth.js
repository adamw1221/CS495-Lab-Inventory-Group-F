const rateLimit = require("express-rate-limit");
const bcrypt = require('bcrypt');

function loginHandler(req, res){
  const message = 'Too many login attempts. Please try again later.';
  res.redirect(`/login?error=${message}`)
}

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes - 15 * 60 * 1000
  max: 100, // Maximum requests
  handler : loginHandler
});

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  handler: (req, res) => {
    // Send error response when rate limit is exceeded
    res.status(429).json({ error: "Too many requests. Please try again later." });
  }
});

const requireLogin = (req, res, next) => {
  if (!req.session.userId) {
      res.redirect('/login');
  } else {
      next();
  }
};

const requireAdmin = (req, res, next) => {

  if (req.session && req.session.role === 'admin') {
      // User has admin role, allow access to the route
      next();
  } else {
      // User doesn't have admin role, handle unauthorized access
      res.status(403).send('Unauthorized access. Admin only.');
  }
};

async function hashPassword(plaintextPassword, saltRounds) {
  const hash = await bcrypt.hashSync(plaintextPassword, saltRounds);
  if(hash){
      console.log(`\nHash: ${hash}\n`);
      return hash; // Return the hashed password
  }
}

async function authUser(username, password, inClient, inDB, inCollection) {
    
    try {
      const db = inClient.db(inDB);
      const collection = db.collection(inCollection);
      
      // Query the database for the user with the provided username
      const user = await collection.findOne({ username });
      
      if (!user) {
        throw new Error('User not found');
      }
    
      hashedPassword = user["password"];

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, hashedPassword);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      
      // Authentication successful
      return user;

    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  module.exports = {
    authUser,
    loginLimiter,
    rateLimiter,
    requireLogin,
    requireAdmin,
    hashPassword
  };