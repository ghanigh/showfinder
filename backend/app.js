import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { ENV } from './config/env.js';
import cookieParser from 'cookie-parser';

// ROUTES
import movieRoutes from './routes/movie.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

// CONNEXION MONGO
connectDB(ENV.MONGO_URI);

// APP EXPRESS
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Ajout de CORS

// URLS API PREFIX
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/admin", adminRoutes); 

// Middleware pour gérer les erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
