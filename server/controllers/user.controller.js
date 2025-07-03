import User from '../models/User.js';

// ✅ Search by Username
export const searchUsers = async (req, res) => {
  try {
    const username  = req.params.username;

    if (!username) return res.status(400).json({ message: 'Username required' });


    const users = await User.find({
      username: { $regex: username, $options: 'i' },
      isAccepted: true
    }).select('username name profileImage uniqueId');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users' });
  }
};

// ✅ Get Logged-in User Profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error getting profile' });
  }
};

// ✅ Update Profile (optional)
export const updateProfile = async (req, res) => {
  try {
    const { name, location, gender, status } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (location) updateData.location = location;
    if (gender) updateData.gender = gender;
    if (status) updateData.status = status;

    if (req.file) {
      // If profile image is updated
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'chat-profiles',
      });
      updateData.profileImage = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true
    }).select('-password');

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Profile update failed' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select("name age profileImage username");
    res.json(users);
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

