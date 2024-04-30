const express = require ("express");
const { createCelebrant, updateCelebrant, getCelebrant, deleteCelebrant } = require("../controller/celebrant.controller");
const router = express.Router();
const {API_KEY} = require("../utils/apiKey");



router.post('/celebrant', createCelebrant);
router.patch('/celebrants/:id', updateCelebrant);
router.get('/celebrants/:id', getCelebrant);
router.delete('/celebrants/:id', deleteCelebrant);

module.exports = router;