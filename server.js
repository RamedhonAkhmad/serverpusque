

import express from 'express';
import db from './config/database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Antrian from './antrian/antrian-model.js';
import Users from './users/user-model.js'; 
import Feedback from './feedback/feedback-model.js';

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log('Database connected');
  await db.sync(); 
  await Users.sync(); 
  await Antrian.sync(); 
  await Feedback.sync(); 
} catch (error) {
  console.log(error);
}


app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000'],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(router)
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});