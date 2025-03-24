[4:08 pm, 24/3/2025] Shivam4thsemester: const bcrypt = require('bcrypt');
const User = require('../models/userModels');
const jwt = require('jsonwebtoken');

async function userSignup(req, res) {
    console.log(req.body)
    try {
      const {
        name,
        email,
        password
      } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username, Email or phone number already exists' });
    }

    const hashedLoginPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedLoginPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    if (!email || !password) {
      return res.status(400).json({ message: 'Username/Email and password are required' });
    }

    const user = await User.findOne({
      $or: [{ email: email }],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { userSignup, userLogin };
[4:09 pm, 24/3/2025] Shivam4thsemester: fol-models file-userModels.js
[4:09 pm, 24/3/2025] Shivam4thsemester: const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);