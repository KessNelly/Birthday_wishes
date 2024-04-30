const { sq } = require('../config/dbConnect');
const { DataTypes } = require('sequelize');



const Channel = sq.define("channel", {
    name: {
        type: DataTypes.STRING,
        required: true,
    },
    description: {
        type: DataTypes.STRING,
    },
    },
    {
        timestamps: true,
    }
);


Channel.sync().then(()=>{
    console.log("Channel Model synced");
});



module.exports = Channel;