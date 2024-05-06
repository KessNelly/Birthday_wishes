const express = require ("express");
const { createCelebrant, getCelebrant, deleteCelebrant, updateCelebrant, getAllCelebrants} = require("../controller/celebrant.controller");
const validateApiKey = require("../middleware/authorizeApi");
const router = express.Router();



router.post('/celebrant', validateApiKey,createCelebrant);
router.patch('/celebrant/:id', validateApiKey,updateCelebrant);
router.get('/celebrant/:id',validateApiKey,getCelebrant);
router.get('/celebrants', validateApiKey,getAllCelebrants);
router.delete('/celebrant/:id', validateApiKey,deleteCelebrant);

module.exports = router;