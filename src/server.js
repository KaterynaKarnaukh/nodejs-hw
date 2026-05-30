import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(logger);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use(authRoutes);
app.use(notesRoutes);

// ─── Celebrate validation errors ──────────────────────────────────────────────

app.use(errors());

// ─── 404 ─────────────────────────────────────────────────────────────────────

app.use(notFoundHandler);

// ─── Error Handler ────────────────────────────────────────────────────────────

app.use(errorHandler);

// ─── Start ───────────────────────────────────────────────────────────────────

const PORT = Number(process.env.PORT) || 3000;

const startServer = async () => {
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
