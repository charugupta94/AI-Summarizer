const express = require("express");
const router = express.Router();

const {signup,login} = require("../controllers/authController.js");

// const jwt_Token = process.env.JWT_SECRET; 
// SIGNUP
router.post("/signup",signup);

// LOGIN
router.post("/login",login);

module.exports = router;
