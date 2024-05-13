const { body } = require('express-validator');

const createCelebrantValidation = [
    body('username', 'Username is required').notEmpty(),
    body('gender', 'Gender is required').notEmpty().isIn(['M', 'F', 'O']),
    body('phone_number', 'Phone number is required').notEmpty().isMobilePhone(),
    body('email', 'Email is required').notEmpty().isEmail(),
    body('birthdate', 'Birthdate is required').notEmpty().isISO8601(),
    body('channel', 'Channel is required').notEmpty()
];


module.exports = createCelebrantValidation;
