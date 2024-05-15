const express = require ("express");
const { createCelebrant, getCelebrant, deleteCelebrant, updateCelebrant, getAllCelebrants, createBirthdayWish, getAllWishes} = require("../controller/celebrant.controller");
const validateApiKey = require("../middleware/authorizeApi");
const createCelebrantValidation = require("../utils/validator");
const router = express.Router();



router.post('/celebrant',validateApiKey,createCelebrantValidation,createCelebrant);
router.post('/wishes', validateApiKey,createBirthdayWish);
router.patch('/celebrant/:id', validateApiKey,updateCelebrant);
router.get('/celebrant/:id',validateApiKey,getCelebrant);
router.get('/celebrants', validateApiKey,getAllCelebrants);
router.get('/wishes', validateApiKey,getAllWishes);
router.delete('/celebrant/:id', validateApiKey,deleteCelebrant);

module.exports = router;