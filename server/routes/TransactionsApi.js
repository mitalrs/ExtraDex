import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from 'passport';
import * as TransactionController from '../controller/TransactionController.js';

const router = Router();

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    TransactionController.index
);

router.post("/", async (req, res) => {
    const { amount, description, date } = req.body;
    const transaction = new Transaction({
        amount,
        description,
        date,
    });
    await transaction.save();
    res.json({ message: "success" });
});

router.delete('/:id', async (req, res) => {
    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ message: "success" });
});

router.patch('/:id', async (req, res) => {
    await Transaction.updateOne({ _id: req.params.id }, { $set: req.body })
    res.json({ message: "success" });
});

export default router;