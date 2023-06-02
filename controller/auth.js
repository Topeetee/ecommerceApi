const User = require("../models/user");
const Errror = require("../utils/error")
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

    try {

        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(Error(404, "user not found"));


        const isPasswordCorrect = CryptoJS.AES.decrypt(user.password, process.env.pass_sec)
        const originalText = isPasswordCorrect.toString(CryptoJS.enc.Utf8);

        if (originalText === req.body.Password) return next();
        else {
            next(Error(400, "wrong password or username"));
        }



        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT);

        const { password, isAdmin, ...otherdDetails } = user._doc;
        res.cookie("access_token",
            token, { httpOnly: true, }).status(200).send({ ...otherdDetails });
    } catch (err) {
        next(err)
    }
}
module.exports = { authSign, authLogin };