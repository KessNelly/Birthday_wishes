const { Sequelize } = require ("sequelize");
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});


const dbConnect = async ()=> {
    try {
        await sequelize.authenticate();
        console.log("Connection successfully established");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}


module.exports = { sq: sequelize, dbConnect};