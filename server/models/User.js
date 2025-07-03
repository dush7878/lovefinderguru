import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: ''
  },
  number: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['verified', 'not-verified'],
    default: 'not-verified'
  },
  isAccepted: {
    type: Boolean,
    default: false
  },
  money: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
