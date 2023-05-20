const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.json({
      message: 'User registered successfully!',
    });
  } catch (error) {
    res.json({
      message: `Error occured, ${error}`,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    const compare = bcrypt.compare(password, user.password);
    if (compare) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
      );
      const refreshToken = jwt.sign(
        { email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME }
      );
      res.status(200).json({
        message: 'Login successful',
        token,
        refreshToken,
      });
    } else {
      res.json({
        message: 'Password does not match',
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;

    const verification = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (verification) {
      let token = jwt.sign(
        { username: verification.name },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME }
      );
      let refreshToken = req.body.refreshToken;
      res.status(200).json({
        message: 'Token refreshed',
        token,
        refreshToken,
      });
    }
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
module.exports = {
  register,
  login,
  refresh,
};
