import express from 'express';
import { 
  createQuiz, 
  getQuizzes, 
  updateQuiz, 
  deleteQuiz 
} from '../controllers/quiz.js';
import { checkRole } from '../middlewares/auth.js';

const router = express.Router();

// Admin-only routes
router.post('/', checkRole('admin'), createQuiz);
router.patch('/:id', checkRole('admin'), updateQuiz);
router.delete('/:id', checkRole('admin'), deleteQuiz);
router.put('/:id', checkRole('admin'), updateQuiz);

// Public routes
router.get('/', getQuizzes);

export default router;