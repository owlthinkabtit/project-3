import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Must match an email address!"]
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password, salt);
    
  } catch (err) {
    console.error("Hashing error:", err);
    throw err;
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User; 

