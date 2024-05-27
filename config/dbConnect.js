const pg = require('pg')
const dotenv = require('dotenv').config(); 

const pool = new pg.Pool({
    database: process.env.DATABASE, 
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    dialect: 'postgres'
});

const dbConnect = async ()=> {
    try {
        await pool.connect()
        console.log("Connection successfully established");
    } catch (error) {
        console.error("Unable to connect to the database:", error.stack);
    }
}


module.exports = {pool, dbConnect} ;