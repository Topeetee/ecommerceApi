const User = require("../models/user");
const createError = require("../utils/error")
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");
require('dotenv').config();


const authSign = async (req, res, next) => {

    try {
        var hash = CryptoJS.AES.encrypt(req.body.password, process.env.pass_sec).toString();
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Perform password validation using the regex pattern
        if (!req.body.password || !passwordRegex.test(req.body.password)) {
            return res.status(400).json({
                error:
                    'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
            });
        }

       

        await newUser.save();
        res.status(200).send("user has been created");
    } catch (err) {
        next(err)
    }
}
const authLogin = async (req, res, next) => {

    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.pass_sec
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

            const token = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            },process.env.JWT,{ expiresIn: '3d' } );

            
            
        const { password, ...others } = user._doc; 
        res.cookie('access_token', token, { httpOnly: true }); 
        res.status(200).json({...others});

    }catch(err){
        res.status(500).json(err);
    }

};
module.exports = { authSign, authLogin };