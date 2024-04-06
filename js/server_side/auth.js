const rateLimit = require("express-rate-limit");
const bcrypt = require('bcrypt');

function loginHandler(req, res){
  const message = 'Too many login attempts. Please try again later.';
  res.redirect(`/login?error=${message}`)
}

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes - 15 * 60 * 1000
  max: 100, // Maximum requests
  handler : loginHandler
});

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
    loginLimiter
  };