import Chat from "../models/Message.js";
import User from "../models/User.js";

// ✅ Send Message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const newMessage = await Chat.create({
      sender: req.user.id,
      receiver: receiverId,
      message,
      isRead: false, // ✅ mark as unread by default
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Messages Between Logged-in User & Receiver
export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;

    // Mark received messages as read
    await Chat.updateMany(
      { sender: receiverId, receiver: req.user.id, isRead: false },
      { $set: { isRead: true } }
    );

    const messages = await Chat.find({
      $or: [
        { sender: req.user.id, receiver: receiverId },
        { sender: receiverId, receiver: req.user.id },
      ],
    }).sort("createdAt");

    const receiver = await User.findById(receiverId).select(
      "name username profileImage"
    );

    res.json({ messages, receiver });
  } catch (error) {
    console.error("Get Messages Error:", error);
    res.status(500).json({ message: "Failed to get messages" });
  }
};

// ✅ Get Chat List
export const getChatList = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .sort({ updatedAt: -1 })
      .populate("sender receiver", "name username profileImage");

    const uniqueUsersMap = new Map();

    chats.forEach((chat) => {
      const partner =
        chat.sender._id.toString() === userId
          ? chat.receiver
          : chat.sender;

      const isUnread =
        chat.receiver._id.toString() === userId && chat.isRead === false;

      if (!uniqueUsersMap.has(partner._id.toString())) {
        uniqueUsersMap.set(partner._id.toString(), {
          user: partner,
          lastMessage: chat.message,
          isUnread,
        });
      }
    });

    const chatList = Array.from(uniqueUsersMap.values());

    res.json(chatList);
  } catch (err) {
    console.error("Get Chat List Error:", err);
    res.status(500).json({ message: "Failed to get chat list" });
  }
};

// ✅ Get Unread Count (per sender)
export const getUnreadCount = async (req, res) => {
  try {
    const unread = await Chat.aggregate([
      {
        $match: {
          receiver: req.user._id,
          isRead: false,
        },
      },
      {
        $group: {
          _id: "$sender",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(unread);
  } catch (error) {
    console.error("Unread Count Error:", error);
    res.status(500).json({ message: "Failed to get unread count" });
  }
};
