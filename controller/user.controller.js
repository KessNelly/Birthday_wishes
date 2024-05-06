const {pool} = require('../config/dbConnect');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const passportCustom = require('passport-custom');
const bcrypt = require('bcrypt');


//create a new user
passport.use('generateApi', new passportCustom.Strategy(async(req, done) => {
    const {phone_number,password} = req.body;

    if (!phone_number || !password) {
        return done(null, false, {
            success: false,
            msg: "All fields are required!",
        });
    }
    
    try {
        //check if user exists
        const userExistsQuery = {text: "SELECT * FROM celebration.user WHERE phone_number = $1",
         values: [phone_number]
    };

        const { rows } = await pool.query(userExistsQuery);

        if (rows.length > 0) {
             const user = rows[0]


             const passwordMatch = await bcrypt.compare(password, user.password);

             if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password!' });
            };

            return done(null, user, { message: 'Logged in successfully' });
            
        }
 
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const api_key_uuid = uuidv4();

        // Hash user phone number
        const hashedPhoneNumber = await bcrypt.hash(phone_number, 10);

        // Combine UUID and hashed phone number to generate API key
        const api_key = api_key_uuid + hashedPhoneNumber;

        //insert new user
        const insertUserQuery = {
            text: "INSERT INTO celebration.user (phone_number,password,api_key,is_admin) VALUES ($1, $2, $3, $4) RETURNING *",
            values: [phone_number,password,api_key,true] 
        }

        const {rows: newUser}= await pool.query(insertUserQuery);


        return done(null,{
            success: true,
            msg: "User created successfully",
            data: newUser[0]
        });
    } catch (error) {
        console.error("Error creating new User", error);
        return done({
          message: "internal server error",
        });
    }
}
)
)

module.exports = passport