const express = require ("express");
const router = express.Router();
const {API_KEY} = require("../utils/apiKey");
const { createChannel, getChannel, deleteChannel } = require("../controller/channel.controller");

router.post('/channels', createChannel);
router.get('/channels', getChannel);
router.delete('/channels', deleteChannel);

module.exports = router;