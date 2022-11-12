import mongoose from 'mongoose';
const { Schema } = mongoose;

const transactionSchema = new Schema({
    amount: Number,
    description: String,
    data: {type: Date, defult:new Date()},
    createdAt: {type: Date, defult:Date.now},
});


export default new mongoose.model('Transaction', transactionSchema);