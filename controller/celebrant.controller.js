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
        // Fetch existing celebrant details
        const getExistingCelebrantQuery = {
            text: 'SELECT * FROM celebration.celebrants WHERE id = $1',
            values: [id]
        };

        const { rows: existingCelebrant } = await pool.query(getExistingCelebrantQuery);

        if (existingCelebrant.length === 0) {
            return res.status(404).json({ message: "Celebrant not found" });
        }

        // Update celebrant excluding the username

        const updateACelebrant ={text: 'UPDATE celebration.celebrants SET gender = $1, phone_number = $2, email = $3,birthdate = $4, channel = $5 ,is_active = $6 WHERE id =$7 RETURNING *' , 
        values: [gender,phone_number,email,birthdate,channel, is_active, id]
    };

    const { rows } = await pool.query(updateACelebrant);

     // Update the username if it's provided and different from the existing one
     if (username && username !== existingCelebrant[0].username) {
        const updateUsernameQuery = {
            text: 'UPDATE celebration.celebrants SET username = $1 WHERE id = $2 RETURNING *',
            values: [username, id]
        };
        const { rows: updatedUsernameCelebrant } = await pool.query(updateUsernameQuery);
        rows[0].username = updatedUsernameCelebrant[0].username; // Update the username in the response
    }

    res.status(200).json({
        msg: "Celebrant updated successfully!",
        data: rows[0]
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


//create a new birthday wish
const createBirthdayWish = async(req, res) => {
    const {celebrant_id,message,scheduled_time} = req.body

    try {
         //check if celebrant exists
         const wishExistsQuery = {text: "SELECT * FROM celebration.birthday_wishes WHERE celebrant_id = $1",
         values: [celebrant_id]
        };

        const { rows } = await pool.query(wishExistsQuery);

        if (rows.length === 0) {
            //if celebrants exists, continue with creating new wish
        const result = {
            text: "INSERT INTO celebration.birthday_wishes (celebrant_id,message,scheduled_time) VALUES ($1, $2, $3) RETURNING *",
            values: [celebrant_id,message,scheduled_time]
        }

        const {rows: newWish}= await pool.query(result);
        
         return res.status(200).json ({
            success: true,
            msg: "Birthday wish created successfully",
            data: newWish[0]
        });
    } else {
        // If celebrant doesn't exist, return an error
        return res.status(404).json({
            success: false,
            msg: "Celebrant not found",
        });
    }
    
} catch (error) {
        console.error("Error creating new wish", error);
        return res.status(500).json({
          message: "internal server error",
        });
    }
};


//get all wishes
const getAllWishes = async (req, res) => {
    try {
        // Fetch all wishes with associated celebrants
        const getWishesQuery = {
            text: 'SELECT * FROM celebration.birthday_wishes INNER JOIN celebration.celebrants ON celebration.birthday_wishes.celebrant_id = celebration.celebrants.id'
        };

        const { rows } = await pool.query(getWishesQuery);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No birthday wishes found" });
        }

        res.status(200).json({
            msg: "Successful!",
            data: rows
        });
    } catch (error) {
        console.error("Error fetching birthday wishes", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


module.exports = {createCelebrant, getCelebrant,getAllCelebrants, updateCelebrant,deleteCelebrant,createBirthdayWish, getAllWishes};
