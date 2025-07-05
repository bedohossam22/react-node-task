import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quiz.js';
import announcementRoutes from './routes/announcement.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection (for quizzes/announcements)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/announcements', announcementRoutes);
// Protected admin route 
app.post('/api/admin', (req, res) => {
  if (req.body.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  res.json({ message: 'Welcome to admin dashboard' });
});

// Protected user route
app.post('/api/user', (req, res) => {
  if (req.body.role !== 'user') {
    return res.status(403).json({ message: 'User access required' });
  }
  res.json({ message: 'Welcome to user dashboard' });
});





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});