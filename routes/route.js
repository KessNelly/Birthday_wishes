const express = require('express');
const authenticateUser = require('../middleware/userMiddleware');
const router = express.Router();

router.post('/auth', authenticateUser, (req, res) => {
    // This route is protected and only accessible to authenticated users
    res.json({ success: true, message: 'Successful', user: req.user });
});

module.exports = router;