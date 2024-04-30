const User = require ("../model/user.model")
const Celebrant = require("../model/celebrant.model");
const Channel = require("../model/channel.model")
const {API_KEY} = require("../utils/apiKey");


//create channel
const createChannel = async(req, res) => {
    try {
        const newChannel = await Channel.create(req.body);
        res.json (newChannel);
    } catch (error) {
        throw new Error (error);
    }
};

//get channel
const getChannel = async (req, res) => {
    const id = req.params;
    try {
        const getChannel = await Channel.findById(id);
        res.json(getChannel);
    } catch (error) {
        throw new Error (error);
    }
};

// delete channel
const deleteChannel = async (req, res) => {
    const id = req.params;
    try {
        const deletedChannel = await Channel.findbyIdAndDelete (id, req.body, {new:true});
        res.json(
            deletedChannel,
            {
            msg: "Successfully deleted!"
        });
    } catch (error) {
        throw new Error (error);
        
    }
};

module.exports = {createChannel, getChannel, deleteChannel};