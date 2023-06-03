 const Cart = require("../models/cart")
 const createError = require("../utils/error")

 const createCart = async(req,res,next)=>{
    const cart = new Cart(req.body);
    try{
        const savedCart = await cart.save()
        res.status(200).json(savedCart)
    }
    catch(err){
        next(err)
    }
 }
 const updateCart = async(req,res,next)=>{
    try { 
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (err) {
        next(res.status(500).json(err));
      }
 }
 const deleteCart = async(req,res,next)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
            res.status(200).json("product has been deleted")
    }catch (err) {
        next(res.status(500).json(err));
      }
}
const getCart = async(req,res,next)=>{
    try{
        const getcart = await Cart.findById(req.params.id);
        res.status(200).json(getcart)
    }catch (err) {
        next(res.status(500).json(err));
      }
}
 const getCarts = async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
        next(res.status(500).json(err));
    }
  };

  module.exports = {createCart, updateCart,deleteCart, getCart, getCarts}