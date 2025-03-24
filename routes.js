const express = require('express');
// const { getUsers } = require('../controllers/userController');
const userController = require("../controllers/userController");
const router = express.Router();

// router.get('/', getUsers);

router.post('/signup', userController.userSignup)
router.post('/login', userController.userLogin)

module.exports = router