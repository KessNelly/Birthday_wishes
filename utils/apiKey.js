const { sq } = require('../config/dbConnect');


function generateAPIKey (phone_number, password){
    let data = phone_number + password;

    const salt = crypto.randomBytes(16);

    data += salt.toString('hex');

    const hashed = crypto.createHash('sha256').update(data).digest('hex');

    return hashed;
}

const api_key = generateAPIKey(phone_number, password);

console.log("Generated API Key", api_key);

module.exports = api_key;