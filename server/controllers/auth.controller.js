import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import cloudinary from '../config/Cloudinary.js';

export const register = async (req, res) => {
  try {
    const { name, age, gender, location, username, email, number, password } = req.body;
    const file = req.file;

    // Validate required fields
    if (!name || !age || !username || !gender || !location || !password || !file) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username already exists' });

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'chat-profiles'
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      age,
      gender,
      location,
      username,
      email,
      number,
      password: hashedPassword,
      uniqueId: uuidv4(),
      profileImage: uploadResult.secure_url,
      status: 'not-verified',
      isAccepted: false,
      money: 0
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful. Wait for admin approval.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (!user.isAccepted) return res.status(403).json({ message: 'Not approved by admin yet' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        profileImage: user.profileImage,
        money: user.money,
        age: user.age,
        location: user.location,
        gender: user.gender
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
};
