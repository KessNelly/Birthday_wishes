const { sq } = require('../config/dbConnect');
const { DataTypes } = require('sequelize');
const crypto = require('crypto');


const User = sq.define("users", {
    phone_number: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
    },
    api_key: {
        type: DataTypes.STRING,
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});


User.sync().then(()=>{
    console.log("User Model synced");
});


function generateAPIKey (phone_number, password){
    let data = phone_number + password;

    const salt = crypto.randomBytes(16);

    data += salt.toString('hex');

    const hashed = crypto.createHash('sha256').update(data).digest('hex');

    return hashed;
}

const api_key = generateAPIKey(phone_number, password);

console.log("Generated API Key", api_key);

module.exports = User;