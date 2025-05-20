const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { validateEmail, validatePassword } = require('../utils/validate');

exports.register = async ({ username, email, password }) => {
  if (!validateEmail(email)) {
    throw new Error('Invalid email format');
  }

  if (!validatePassword(password)) {
    throw new Error('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one special character');
  }

  const existing = await UserModel.findOne({ email });
  if (existing) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ username, email, password: hashedPassword });

  return {
    message: 'Registered successfully',
  };
};


exports.login = async ({ email, password }) => {
  const existing = await UserModel.findOne({ email });
  if (!existing) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, existing.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: existing._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return {
    message: 'Login successful',
    token,
  };
};