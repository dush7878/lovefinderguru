import express from 'express';
import {
  searchUsers,
  getMyProfile,
  updateProfile,
  getAllUsers
} from '../controllers/user.controller.js';
import authMiddleware from '../middleware/autMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Protected Routes
router.get('/me', authMiddleware, getMyProfile);
router.put('/profile', authMiddleware, upload.single('profileImage'), updateProfile);

// Public
router.get("/search/:username", authMiddleware, searchUsers);
router.get("/all", authMiddleware, getAllUsers);

export default router;
