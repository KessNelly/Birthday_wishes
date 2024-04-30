const User = require ("../model/user.model")
const {API_KEY} = require("../utils/apiKey");
const { Sequelize } = require("sequelize");


//create a new user
const createUser = async(req, res) => {
    const {phone_number,password,api_key,is_admin} = req.body

    if (phone_number) return res.status(200).json({API_KEY},{ msg: "User found" });


    if (!phone_number) return res.status(400).json({ msg: "User not found" });


    try {
        const data = await Sequelize.query(`INSERT INTO birthmark (phone_number,password,api_key,is_admin) VALUES ($1, $2, $3, $4) RETURNING *`, [phone_number,password,api_key,is_admin]);

        console.log(data)

        return res.status(200).json ({
            success: true,
            msg: "User created successfully",
            data
        });
    } catch (error) {
        console.log("Error creating new User");
        return res.status(500).json({
          message: "internal server error",
        });
    }
};


module.exports = {createUser}