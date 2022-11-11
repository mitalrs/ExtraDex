import express from 'express';
import mongoose from 'mongoose';

const PORT = 4000
const app = express();

mongoose.connect("mongodb+srv://mitazl:@cluster0.uqsmrq1.mongodb.net/?retryWrites=true&w=majority"
).then(()=> console.log('MongoDB connection is successful')).catch((err)=>console.error(err));

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.listen(PORT, ()=>{
    console.log("Server is running at http://localhost:4000");
})