const User = require ("../model/user.model")
const Celebrant = require("../model/celebrant.model");
const Channel = require("../model/channel.model")
const {API_KEY} = require("../utils/apiKey");
const { Sequelize } = require("sequelize");


//create a new celebrant
const createCelebrant = async(req, res) => {
    const {username,gender,phone_number,email,birthdate,channel_id,is_active} = req.body

    if (!username) return res.status(400).json({ msg: "Celebrant not found" });


    try {
        const result = await Sequelize.query(`INSERT INTO birthmark (username,gender,phone_number,email,birthdate,channel_id,is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [username,gender,phone_number,email,birthdate,channel_id,is_active]);

        console.log(result)

        return res.status(200).json ({
            success: true,
            msg: "Celebrant created successfully",
            result
        });
    } catch (error) {
        console.log("Error creating new celebrant");
        return res.status(500).json({
          message: "internal server error",
        });
    }
};

//get a celebrant
const getCelebrant = async (req, res) => {
    const id = req.params.id;
    try {
         const data = await Sequelize.query('SELECT FROM birthmark WHERE id = $1', [id])
        res.status(200).json({
            msg: "Successful!",
            data
        });
    } catch (error) {
        console.log("Error deleting celebrant");
        return res.status(500).json({
          message: "internal server error",
        });
    }
};

// update celebrant
const updateCelebrant = async (req, res) => {
    const id = req.params.id;
    const {username,gender,phone_number,email,birthdate,channel_id,is_active} = req.body;

    try {
        await Sequelize.query(`UPDATE birthmark SET username = $1, gender = $2, phone_number = $3, email = $4,birthdate = $5, channel_id = $6 ,is_active = $7 WHERE id =$8)`, [username,gender,phone_number,email,birthdate,channel_id, is_active, id]);
    } catch (error) {
        console.log("Error updating celebrant");
        return res.status(500).json({
          message: "internal server error",
        });
    }
};

// delete a celebrant
const deleteCelebrant = async (req, res) => {
    const id = req.params.id;
    try {
        await Sequelize.query('DELETE FROM birthmark WHERE id = $1', [id])
        res.status(200).json({
            msg: "Successfully deleted!"
        });
    } catch (error) {
        console.log("Error deleting celebrant");
        return res.status(500).json({
          message: "internal server error",
        });
    }
};

module.exports = {createCelebrant, getCelebrant, updateCelebrant, deleteCelebrant};

