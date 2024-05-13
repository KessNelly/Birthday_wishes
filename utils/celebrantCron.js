const cron = require('node-cron');
const {pool} = require('../config/dbConnect');


//async function sendWishes()
const sendWishes = async (req, res) => {
    try {
        const client = await pool.connect();
        const res = await client.query('SELECT * FROM celebrant WHERE scheduled_time >= now() AND scheduled_time <= now() + interval \'1 day\'');

        //iterate over the results and send wishes
        res.rows.forEach(celebrant => {
            //send wishes to celebrant
            sendWishes(celebrant.name, celebrant.wish);
        });

        client.release();
    } catch (error) {
        console.error('Error executing query', error);
    }
}

//schedule the cron job to run at 12am every day
cron.schedule('0 0 * * *', () => {
    console.log('Running cron job....');
    sendWishes();
}, {
    scheduled: true,
    timezone: "Nigeria/Lagos"
});

module.exports = sendWishes;