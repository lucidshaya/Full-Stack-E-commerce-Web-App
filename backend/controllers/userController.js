// Route for user login
import userModel from "../models/userModel.js"
import validator from "validator";

import bcrypt from "bcrypt"



const loginUser = async (req, res) => {
    res.json({ msg: "Login API Working" });
}


// Route for user register 

const registerUser = async (req, res) => {
    res.json({ msg: "Register API Working" });

    try{
        const {name, email, password} = req.body;

        // checking user already exists or not 
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message: "User already exists"})
        }

        // validating email format & strong password 
        if (!validator.isEmail(email)) {
            return res.json({success:false, message: "Please enter a valid email"})
        }
        if (password.length < 8 ) {
            return res.json({success:false, message: "Please enter a Strong password"})
        }

    } catch (error) {

    }
}

// Route for admin Login 
const adminLogin = async (req, res) => {
    res.json({ msg: "Admin Login API Working" });
}


export { loginUser, registerUser, adminLogin }