import { connectDB } from './config/connectDB.js';
import app from './app.js';

const startApp = async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log('Server running on port 3000...');
  });
};

startApp();
