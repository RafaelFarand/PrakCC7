import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/route.js';
import db from './config/database.js';

dotenv.config();

const app = express();
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

(async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
})();

app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], // sesuaikan jika port frontend beda
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
