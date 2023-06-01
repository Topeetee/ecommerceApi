const User = require("../models/user");
const {verifyUser,verifyAdmin} = require("../utils/verifyToken")
const router = require("express").Router();
const {updateUser, deleteUSer, getUSer, getUSers} =require("../controller/user")


//update user
router.put("/:id", verifyUser, updateUser);

//Delete user
router.delete("/:id", verifyUser,deleteUSer);

//get user
router.get("/get/:id", verifyAdmin, getUSer);

//get all users
router.get("/", verifyAdmin, getUSers)

module.exports = router;