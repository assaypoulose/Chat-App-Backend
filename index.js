import express from 'express';
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
app.use(cookieParser()); // Make sure this is before your routes
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true
};
app.use(cors(corsOption));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
