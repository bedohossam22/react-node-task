import express from 'express';
import { 
  createAnnouncement, 
  getAnnouncements, 
  updateAnnouncement, 
  deleteAnnouncement 
} from '../controllers/announcement.js';
import { checkRole } from '../middlewares/auth.js';

const router = express.Router();

// Admin-only routes
router.post('/', checkRole('admin'), createAnnouncement);
router.put('/:id', checkRole('admin'), updateAnnouncement);
router.delete('/:id', checkRole('admin'), deleteAnnouncement);

// Public route
router.get('/', getAnnouncements);

export default router;