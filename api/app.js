import express from 'express'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/errorMiddleware.js';
import { config } from 'dotenv';
import userRoutes from './routes/user.routes.js';
import empolyeeRoutes from './routes/empolyee.routes.js';
import cors from 'cors'
import isLogidin from './middleware/auth.middleware.js';
config();

const app=express();


app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,  
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/empolyee', empolyeeRoutes);

app.use(errorMiddleware);
app.all('*', (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

export default app;