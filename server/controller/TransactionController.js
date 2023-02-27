import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
    const transaction = await Transaction.find({}).sort({ createdAt: -1 });
    res.json({ data: transaction });
}