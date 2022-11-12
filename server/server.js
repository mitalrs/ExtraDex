import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import TransactionsApi from "./routes/TransactionsApi.js";

const PORT = 4000
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.use("/transaction", TransactionsApi);

await mongoose.connect("mongodb+srv://mital:Mitalmital@cluster0.uqsmrq1.mongodb.net/?retryWrites=true&w=majority")
 console.log('MongoDB connection is successful');


app.listen(PORT, ()=>{
    console.log("Server is running at http://localhost:4000");
});