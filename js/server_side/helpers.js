//deprecated - moved all of these into auth.js since they were logically similar enough relating to auth and security 
//maybe use this for other functions that need not eb in server.js directly

const bcrypt = require('bcrypt');

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

module.exports = {
    requireLogin,
    requireAdmin,
    hashPassword
};