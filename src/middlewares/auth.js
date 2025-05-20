const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
// console.log(req.headers)
  if (!authHeader) {
  return res.status(401).json({ error: 'Not authorized, no token' });
}

const token = authHeader.startsWith('Bearer ')
  ? authHeader.split(' ')[1]
  : authHeader;


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id).select('-password'); // exclude password
    if (!req.user) {
      return res.status(401).json({ error: 'User not found' });
    }

    next(); 
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = protect;
