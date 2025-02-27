import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Fields are missing!' });
    return;
  }

  // if already registered
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(409).json({ message: 'User already exists' });
    return;
  }

  // hash password
  const hashedPassword = bcrypt.hashSync(password, 10);
  let user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  res.status(201).json({
    message: 'User registered successfully',
  });
  return;
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ message: 'User not found!' });
    return;
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (isPasswordCorrect) {
    // assign a token as a cookie
    const token = jwt.sign({ userId: user._id }, 'jwt-key', {
      expiresIn: '10d',
    });

    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 10,
    });

    res.status(200).json({ message: 'User Logged In successfully' });
    return;
  } else {
    res.status(400).json({ message: 'Invalid Credentials!' });
    return;
  }
};

const getMe = async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  if (!user) {
    res.status(404).json({ message: 'User not found!' });
    return;
  }
  res.status(200).json({ user });
  return;
};

const logoutUser = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'logged out successfully' });
  return;
};

export { loginUser, registerUser, getMe, logoutUser };
