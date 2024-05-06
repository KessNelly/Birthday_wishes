const {pool} = require('../config/dbConnect');


//create a new celebrant
const createCelebrant = async(req, res) => {
    const {username,gender,phone_number,email,birthdate,channel,is_active} = req.body

    try {
         //check if celebrant exists
         const celebrantExistsQuery = {text: "SELECT * FROM celebration.celebrants WHERE username = $1",
         values: [username]
        };

        const { rows } = await pool.query(celebrantExistsQuery);

        if (rows.length > 0) {
            const celebrant = rows[0]

        }

        //insert new celebrant
        const result = {
            text: "INSERT INTO celebration.celebrants (username,gender,phone_number,email,birthdate,channel,is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            values: [username,gender,phone_number,email,birthdate,channel,true]
        }

        const {rows: newCelebrant}= await pool.query(result);
        
         return res.status(200).json ({
            success: true,
            msg: "Celebrant created successfully",
            data: newCelebrant[0]
        });
    } catch (error) {
        console.error("Error creating new celebrant", error);
        return res.status(500).json({
          message: "internal server error",
        });
    }
};


//get a celebrant
const getCelebrant = async (req, res) => {
    const id = req.params.id;
    try {
        //fetch user
         const getACelebrant = {text:'SELECT * FROM celebration.celebrants WHERE id = $1 AND is_deleted = false' ,
         values: [id]
        };

        const { rows } = await pool.query(getACelebrant);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Celebrant not found" });
        }

        res.status(200).json({
            msg: "Successful!",
            data : rows
        });
    } catch (error) {
        console.error("Error fetching celebrant", error);
        return res.status(500).json({
          message: "internal server error",
        });
    }
};

//get all celebrants
const getAllCelebrants = async (req, res) => {
    try {
        // Fetch all celebrants that are not marked as deleted
        const getCelebrantsQuery = {
            text: 'SELECT * FROM celebration.celebrants WHERE is_deleted = false'
        };

        const { rows } = await pool.query(getCelebrantsQuery);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No celebrants found" });
        }

        res.status(200).json({
            msg: "Successful!",
            data: rows
        });
    } catch (error) {
        console.error("Error fetching celebrants", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

//update a celebrant
const updateCelebrant = async (req, res) => {
    const id = req.params.id;
    const {username,gender,phone_number,email,birthdate,channel,is_active} = req.body;

    try {
        const updateACelebrant ={text: 'UPDATE celebration.celebrants SET username = $1, gender = $2, phone_number = $3, email = $4,birthdate = $5, channel = $6 ,is_active = $7 WHERE id =$8 RETURNING *' , 
        values: [username,gender,phone_number,email,birthdate,channel, is_active, id]
    };

    const { rows } = await pool.query(updateACelebrant);

    res.status(200).json({
        msg: "Successful!",
        data : rows
    });
    
    }
    catch (error) {
        console.error("Error updating celebrant", error);
        return res.status(500).json({
          message: "internal server error",
        });
    }
};



 // delete a celebrant
const deleteCelebrant = async (req, res) => {
    const id = req.params.id;
    try {
          // Soft delete by setting the is_deleted flag to true
        const deleteACelebrant = {text:'UPDATE celebration.celebrants SET is_deleted = true WHERE id = $1',
        values: [id]
    };

    const { rows } = await pool.query(deleteACelebrant);

        res.status(200).json({
            msg: "Successfully deleted!",
            data: rows[0]
        });
    } catch (error) {
        console.error("Error deleting celebrant", error);
        return res.status(500).json({
          message: "internal server error",
        });
    }
};

module.exports = {createCelebrant, getCelebrant,getAllCelebrants, updateCelebrant,deleteCelebrant};

