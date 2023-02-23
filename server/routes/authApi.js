import { Router } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(406).json({ message: "user already exists." });
        return;
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    console.log(hashedPassword);


    const user = await User({ 
        email, 
        password: hashedPassword, 
        firstName, 
        lastName 
    });
    await user.save();
   

    res.status(201).json({ message: "user is created" });
});


//login
router.post('/login', async (req, res) =>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(406).json({ message: "credentials not found" });
        return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
        res.status(406).json({ message: "credentials not found" });
        return;
    }

    const payload = {
        username: email,
        _id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({message: "succesfully logged.", token});
});

export default router;