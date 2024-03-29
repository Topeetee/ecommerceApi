const express = require("express");
const router = express.Router();
const {verifyUser,verifyAdmin} = require("../utils/verifyToken")
const {createCart, deleteCart, getCart, getCarts, updateCart}= require("../controller/cart")

router.post("/addToCart", verifyUser, createCart)
//update
router.put("/:id", verifyUser,updateCart)
//delete
router.delete("/:id", verifyUser,deleteCart)
//get specific hotel
router.get("/:id", verifyUser , getCart)

//get all hotels
router.get("/", verifyAdmin,getCarts)
module.exports = router;