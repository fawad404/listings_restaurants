// utils/model/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false, // Not required if using Google authentication
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
