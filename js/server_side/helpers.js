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

module.exports = {
    requireLogin,
    requireAdmin
};