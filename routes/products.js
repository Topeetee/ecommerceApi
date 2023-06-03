const Product = require("../models/product");
const {verifyUser,verifyAdmin} = require("../utils/verifyToken")
const express = require("express");
const router = express.Router();
const { updateProduct, deleteProduct, getProduct, getProducts, createProduct } = require("../controller/product");

router.post("/addproduct", verifyUser,createProduct)
//update user
router.put("/:id", verifyUser, updateProduct);

//Delete user
router.delete("/:id", verifyUser,deleteProduct);

//get user
router.get("/get/:id", verifyAdmin, getProduct);

//get all users
router.get("/", verifyAdmin, getProducts)

module.exports = router;