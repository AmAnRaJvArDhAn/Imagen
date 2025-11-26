import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../Models/user.model.js";
import { auth } from "../Middlewares/auth.js";
import { z } from "zod";

const router = express.Router();

//this file contains signup , login, Protected and logout routes-----------------------------------------

// Zod validation schemas------------------------------------------------
const signupSchema = z.object({
    fullName: z.string().trim().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});
//-------------------------------------------------------------------------

//--------------------------signup route------------------------------------
router.post("/signup", async (req, res) => {
    //validating with zod
    const { fullName, email, password } = signupSchema.parse(req.body); // Destructure form data, 
    try {
        const existingUser = await User.findOne({ email });  // Check if user already exists
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);   // Hash password
        const user = new User({ fullName, email, passwordHash: hashedPassword }); //creating user
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})
//-------------------------------------------------------------------------


//--------------------------login route------------------------------------
router.post("/login", async (req, res) => {
    try {
          const { email, password } = loginSchema.parse(req.body);
        const user = await User.findOne({ email });    //Find user from the database
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        //creating JWT
        const token = jwt.sign(
            { userId: user._id },     //payload
             process.env.JWT_SECRET,   //signature/secret
              { expiresIn: "7d" }      //options
        );
        res.cookie("token", token, {
             httpOnly: true,
             secure : true,
             sameSite : "none",
             maxAge: 7 * 24 * 60 * 60 * 1000    //cookie expires in 7 days
        });
        res.status(200).json({ 
            message: "Login successful",
            user :{
                fullName: user.fullName,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})
//-------------------------------------------------------------------------


//--------------------------Protected route------------------------------------
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-passwordHash");   //don't return password   
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
})
//-------------------------------------------------------------------------


//--------------------------logout route------------------------------------
router.post("/logout", (req, res) => {
    res.clearCookie("token",{
        httpOnly: true,
        secure : true,
        sameSite : "none"
    });
    res.status(200).json({ message: "Logout successful" });
})
//-------------------------------------------------------------------------

export default router