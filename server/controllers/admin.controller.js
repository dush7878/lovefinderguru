import User from '../models/User.js';
import Message from '../models/Message.js';

// ✅ Accept User
export const acceptUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndUpdate(userId, { isAccepted: true, status: "verified" });
    res.json({ message: 'User accepted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to accept user.' });
  }
};

// ✅ Dashboard Stats
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ isAccepted: true });
    const male = await User.countDocuments({ gender: 'male', isAccepted: true });
    const female = await User.countDocuments({ gender: 'female', isAccepted: true });

    res.json({ totalUsers, male, female });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
};

// ✅ Pending Requests
export const getPendingUsers = async (req, res) => {
  try {
    const pending = await User.find({ isAccepted: false });
    res.json(pending);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending users' });
  }
};

// ✅ Get All Accepted Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ isAccepted: true });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

// ✅ Get Single User Detail
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
};

// ✅ Add Money to User
export const addMoney = async (req, res) => {
  try {
    const { money } = req.body;

    // Validate input
    if (typeof money !== "number") {
      return res.status(400).json({ message: "Money must be a number" });
    }

    await User.findByIdAndUpdate(req.params.userId, {
      $set: { money }
    });

    res.json({ message: "Money updated successfully" });
  } catch (error) {
    console.error("Error updating money:", error);
    res.status(500).json({ message: "Failed to update money" });
  }
};



// ✅ Get Users Chatted With
export const getChatUsers = async (req, res) => {
  try {
    const { userId } = req.params;

    const sentTo = await Message.distinct('receiverId', { senderId: userId });
    const receivedFrom = await Message.distinct('senderId', { receiverId: userId });

    const allUserIds = Array.from(new Set([...sentTo, ...receivedFrom]));

    const users = await User.find({ _id: { $in: allUserIds } }, 'username name profileImage');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error getting chat users' });
  }
};

// ✅ Get Messages Between Two Users
export const getMessagesBetweenUsers = async (req, res) => {
  try {
    const { from, to } = req.query;

    const messages = await Message.find({
      $or: [
        { senderId: from, receiverId: to },
        { senderId: to, receiverId: from }
      ]
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat history' });
  }
};
