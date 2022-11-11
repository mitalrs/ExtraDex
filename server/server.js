import express from 'express';

const PORT = 4000

const app = express();

app.length("/",(req,res)=>{
    res.send("hello world");
});

app.listen(PORT, ()=>{
    console.log();
})