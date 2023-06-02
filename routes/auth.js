const express = require("express");
const router = express.Router();
const { authLogin,authSign } = require("../controller/auth");

router.post("/signup", authSign);
router.post("/login",authLogin);
module.exports = router;


