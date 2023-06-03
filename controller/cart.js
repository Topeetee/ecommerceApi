//  const Cart = require("../models/cart")
//  const createError = require("../utils/error")

//  const createCart = async(req,res,next)=>{
//     const cart = new Cart(req.body);
//     try{
//         const savedCart = await cart.save()
//         res.status(200).json(savedCart)
//     }
//     catch(err){
//         next(err)
//     }
//  }