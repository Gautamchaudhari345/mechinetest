import path from 'path';
import multer from 'multer';

// Define storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Temporary destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// Create multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.webp', '.mp4'].includes(ext)) {
      cb(null, true); // Accept file
    } else {
      cb(new Error(`Unsupported file type! Only JPG, JPEG, PNG, WEBP, and MP4 are allowed.`), false); // Reject file
    }
  },
});

// Export the upload middleware
export default upload;
