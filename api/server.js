import app from "./app.js";
import cloudinary from 'cloudinary'
import dbconnection from "./config/dbConnection.js";
const PORT=process.env.PORT || 5014


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, async () => {
    await dbconnection();
    console.log(`App is running at http://localhost:${PORT}`);
  });