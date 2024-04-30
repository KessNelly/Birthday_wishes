const { sq } = require('../config/dbConnect');
const { DataTypes } = require('sequelize');



const Celebrant = sq.define("celebrant", {
    username: {
        type: DataTypes.STRING,
        required: true,
        unique: true
    },
    gender: {
        type: DataTypes.STRING,
        enum: ["M", "F", "O"],
    },
    phone_number: {
        type: DataTypes.STRING,
        required: true,
    },
    email: {
        type: DataTypes.STRING,
    },
    birthdate: {
        type: DataTypes.STRING,
        required: true,
    },
    channel_id: {
        type: DataTypes.INTEGER,
        required: true,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    },
    {
        timestamps: true,
    }
);


Celebrant.sync().then(()=>{
    console.log("Celebrant Model synced");
});



module.exports = Celebrant;