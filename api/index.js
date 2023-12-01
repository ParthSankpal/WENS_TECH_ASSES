import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


import userRouter from './routes/user.route.js';


mongoose.connect(process.env.MONGODB).then(()=>{
        console.log("CONNECTED TO MONGODB");
    }).catch(err=>{
        console.log(err.message);
    });


const app = express();

app.listen(3000, ()=>{
    console.log("SERVER STARTED ON PORT 3000");
});


app.use('/api/user', userRouter);