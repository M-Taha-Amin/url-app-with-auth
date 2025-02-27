import express from 'express';
import cors from 'cors';
import urlRouter from './routes/url.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/url', urlRouter);
app.use('/api/auth', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(import.meta.dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'dist', 'index.html'));
    return;
  });
}

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'API is working!' });
});

export default app;
