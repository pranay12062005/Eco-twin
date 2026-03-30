import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectRedis } from './services/redis';
import authRouter from './routes/auth';
import closetRouter from './routes/closet';
import dashboardRouter from './routes/dashboard';
import profileRouter from './routes/profile';
import scanRouter from './routes/scan';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect Redis
connectRedis();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Health check
app.get('/health', (_, res) => res.json({ status: 'ok', version: '1.0.0' }));

// Routes 
app.use('/auth', authRouter);
app.use('/api/closet', closetRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/profile', profileRouter);
app.use('/api/scan', scanRouter);
// app.use('/api/badges', badgesRouter);

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🌿 Eco-Twin API running on http://localhost:${PORT}`);
});

export default app;
