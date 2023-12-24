import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


import userRouter from './routes/user.route.js';

import authRouter from './routes/auth.route.js';

import listingRouter from './routes/listing.route.js';

import cookieParser from 'cookie-parser';

import path from 'path';

mongoose.connect(process.env.MONGODB).then(()=>{
        console.log("CONNECTED TO MONGODB");
    }).catch(err=>{
        console.log(err.message);
    });


    const __dirname = path.resolve();



const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3001, ()=>{
    console.log("SERVER STARTED ON PORT 3000");
});


app.use('/api/user', userRouter);

app.use('/api/auth', authRouter);

app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


app.use((err, req, res, next)=>{
    const statusCode = res.statusCode || 500;
    const message = err.message || "INTERNAL SERVER ERROR";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})