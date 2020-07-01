import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email address"],
    unique: [true, "An account already exists with this email"],
    trim: true,
  },
  username: {
    type: String,
    unique: [true, "An account already exists with this username"],
    required: [true, "Please enter a username"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [5, "Password must be at least 5 characters"]
  },
  imageUrl: {
    type: String,
  },
  firstname: {
    type: String,
    required: [true, "Please enter a firstname"],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, "Please enter a lastname"],
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['User', 'Admin', 'SuperAdmin'],
    default: 'User',
  },
});
const user = mongoose.model('Users', userSchema);
export default user;