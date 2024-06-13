// const express = require('express')// method-1
import express from 'express'; // method-2
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './socket/socket.js';

dotenv.config({});

connectDB();

const PORT = process.env.PORT || 5001;


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

//routes
// http://localhost:8080/api/v1/user/register
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});