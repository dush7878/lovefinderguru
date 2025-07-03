import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { adminLogin } from '../controllers/adminauthController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // temp local storage

router.post('/register', upload.single('profileImage'), register);
router.post('/login', login);
router.post('/admin-login', adminLogin);

export default router;
