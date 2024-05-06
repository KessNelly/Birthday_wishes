const passport = require('../controller/user.controller');

// Middleware function to authenticate user
const authenticateUser = (req, res, next) => {
    passport.authenticate('generateApi', (err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        // If user is authenticated, proceed to the next middleware
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = authenticateUser;
