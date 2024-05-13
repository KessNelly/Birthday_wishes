 const {pool} = require('../config/dbConnect');
 
 // Middleware function to validate API key
const validateApiKey = async (req, res, next) => {
    const api_key = req.headers['x-api-key']; // Assuming API key is provided in the 'x-api-key' header

    // Check if API key is provided and matches a predefined key
    if (!api_key) {
        return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
    };

    //query database to see if api exists
    const getApi = {text:'SELECT * FROM celebration.user WHERE api_key = $1 ' ,
         values: [api_key]
        };

        const { rows } = await pool.query(getApi);
       
        if (rows.length === 0) {
            return res.status(404).json({ message: "Api key not found" });
        }

    next(); // Proceed to the next middleware
};

module.exports = validateApiKey
