import express from 'express';
const router = express.Router();
import User from '../../models/User';


router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Server error during registration" });
  }
});


export default router;