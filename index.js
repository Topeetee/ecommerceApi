const express = require("express");
const cookieParser = require('cookie-parser')

// dont forget to install dotenv packa ge


require('dotenv').config(); 
const mongoose = require ("mongoose");
const Error = require("./utils/error");
const cartRoute =  require("./routes/cart")
const productsRoute =  require("./routes/products")
const orderRoute =  require("./routes/order")
const userRoute =  require("./routes/user")
const authRoute = require("./routes/auth")

const app = express();
const connect = async()=>{
    try{
        await mongoose.connect(process.env.ATLAS_URI);
        console.log("connected to my mongoDb")
    }catch(err){
        throw err;
    }
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});
app.use(express.json());

app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/cart",cartRoute)
app.use("/api/products",productsRoute)
app.use("/api/order",orderRoute)
app.use("/api/user",userRoute)

app.use((err,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        messgae: errorMessage,
        stack: err.stack
      })
})

app.listen(3000, ()=>{ connect() 
    console.log("connected to the port")});