import usersModels from "../models/users.models.js";
import errorMiddleware from "../middleware/errorMiddleware.js"; // Assuming you have this utility for error handling

// Registration controller
const register = async (req, res, next) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return next(new errorMiddleware('All fields are required', 400));
  }

  const userExists = await usersModels.findOne({ email });
  if (userExists) {
    return next(new errorMiddleware('Email is already in use', 409));
  }

  const user = await usersModels.create({
    fullname,
    email,
    password,
  });

  if (!user) {
    return next(new errorMiddleware('User registration failed', 500));
  }
  await user.save();
  const token = await user.generateJWTToken();
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    success: true,
    message: 'User is registered',
    user,
  });
};

// Login controller
const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorMiddleware('All fields are required', 400));
  }

  const user = await usersModels.findOne({ email });
  if (!user) {
    return next(new errorMiddleware('Invalid email or password', 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new errorMiddleware('Invalid email or password', 401));
  }

  res.status(200).json({
    success: true,
    message: 'User logged in successfully',
    user,
  });
};

// Logout controller
const logout = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
};

export {
  register,
  login,
  logout,
};
