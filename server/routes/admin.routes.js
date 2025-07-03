import express from 'express';
import {
  acceptUser,
  getStats,
  getPendingUsers,
  getUsers,
  getUserDetails,
  addMoney,
  getChatUsers,
  getMessagesBetweenUsers
} from '../controllers/admin.controller.js';

const router = express.Router();

// Admin Dashboard
router.get('/dashboard-stats', getStats);

// Manage Users
router.get('/pending-users', getPendingUsers);
router.put('/accept/:userId', acceptUser);
router.get('/users', getUsers);
router.get('/user/:userId', getUserDetails);
router.put('/money/:userId', addMoney);

// View Chats
router.get('/user-chats/:userId', getChatUsers);
router.get('/messages', getMessagesBetweenUsers);

export default router;
