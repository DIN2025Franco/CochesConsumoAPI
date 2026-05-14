import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from './config/db.js';
import cocheRouter from './routes/coches.js';
import authRouter from './routes/authRoutes.js';

import Coche from './models/Coche.js';
import User from './models/User.js';
import mongoose from 'mongoose';
const { Types: { ObjectId } } = mongoose;

const app = express();

connectDB();

app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));

app.use((req, res, next) => {
  req.context = { models: { Coche, User }, ObjectId };
  next();
});

app.use("/auth", authRouter);
app.use("/coches", cocheRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

app.get('/', (req, res) => {
  res.send('¡Hola mundo, desde Express!');
});

export default app;
