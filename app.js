import express from 'express';
import cors from 'cors';
import urlRouter from './routes/url.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/connectDB.js';
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/url', urlRouter);
app.use('/api/auth', userRouter);

app.use(express.static(path.join(process.cwd(), 'dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

const startApp = async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log('Server running on port 3000...');
  });
};

startApp();
