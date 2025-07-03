import express from 'express';
import { sendMessage, getMessages, getChatList, getUnreadCount   } from "../controllers/chat.controller.js";
import authMiddleware from '../middleware/autMiddleware.js'; // Ensure this path is correct

const router = express.Router();

router.post("/send/:receiverId", authMiddleware, sendMessage);
router.get("/messages/:receiverId", authMiddleware, getMessages);
router.get("/list", authMiddleware, getChatList);
router.get("/unread", authMiddleware, getUnreadCount);


export default router;
