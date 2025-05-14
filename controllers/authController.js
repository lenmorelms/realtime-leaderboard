import jwt from 'jsonwebtoken';
import User from '../models/User.js';  // your schema already has the pre-save hook

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Input validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }
    if (typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid input types.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    // 2️⃣ Prevent duplicate usernames
    if (await User.findOne({ username })) {
      return res.status(409).json({ message: 'Username already taken.' });
    }

    // 3️⃣ Create the user _without_ manually hashing
    //    The UserSchema.pre('save') hook will hash `password` for us
    const newUser = await User.create({ username, password });

    // 4️⃣ Reply with the new user’s ID
    res.status(201).json({ userId: newUser._id });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Use the schema’s comparePassword method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Sign and return JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};