import { Router } from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt'

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


    const user = await User({ email, password: hashedPassword, firstName, lastName });
    const savedUser = await user.save();
    console.log(savedUser);

    res.status(201).json({ 'message': "user is created" });
});

export default router;