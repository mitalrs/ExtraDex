import express from 'express';

const PORT = 4000

const app = express();

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.listen(PORT, ()=>{
    console.log("Server is running at http://localhost:4000");
})