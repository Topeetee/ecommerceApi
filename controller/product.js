const Product = require("../models/product");


const createProduct = async(req,res,next)=>{
    const newproduct = new Product(req.body);

    try{
        const savedProduct = await newproduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        next(res.status(500).json(err));
    }
}
const  updateProduct = async(req,res,next)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
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
const deleteProduct = async(req,res,next)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
            res.status(200).json("product has been deleted")
    }catch (err) {
        next(res.status(500).json(err));
      }
}
const getProduct = async(req,res,next)=>{
    try{
        const getpro = await Product.findById(req.params.id);
        res.status(200).json(getpro)
    }catch (err) {
        next(res.status(500).json(err));
      }
}
const getProducts = async(req,res,next)=>{
    try {
        const qNew= req.query.new;
        const qCategory = req.query.category;

        let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
    } catch (err) {
        next(res.status(500).json(err)) ;  
    }
}
module.exports = {createProduct,updateProduct,deleteProduct,getProduct,getProducts}