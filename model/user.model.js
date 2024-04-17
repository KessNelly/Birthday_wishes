const { sq } = require('../config/dbConnect');
const { DataTypes } = require('sequelize');


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


module.exports = User;