const rateLimit = require("express-rate-limit");

function loginHandler(req, res){
  message = 'Too many login attempts. Please try again later.';
  res.redirect(`/login?error=${message}`)
}

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes - 15 * 60 * 1000
  max: 3, // Maximum requests
  handler : loginHandler
});

// TODO: add hashing and way to add user/roster?
function verifyPassword(password, hashedPassword) {
    // return await bcrypt.compare(password, hashedPassword);
    if(password === hashedPassword){
      return true;
    } else {
      return false;
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
    
      hash = user["password"];

      // Verify the password
      const isPasswordValid = verifyPassword(password, hash);

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
    loginLimiter
  };