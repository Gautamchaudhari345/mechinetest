import Employee from '../models/employe.models.js';
import errorMiddleware from '../middleware/errorMiddleware.js';
import cloudinary from 'cloudinary';
import fs from 'fs';
import mongoose from 'mongoose';


export const createEmployee = async (req, res, next) => {
  try {
    const { name, email, designation, mobile_no, gender, course } = req.body;

    // Check if all fields are provided
    if (!name || !email || !designation || !mobile_no || !gender || !course || !req.file) {
      return next(new Error('All fields are required'));
    }

    // Check if employee already exists
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return next(new Error('Employee already exists'));
    }

    // Create the new employee in the database
    const createEmployee = await Employee.create({
      name,
      email,
      designation,
      mobile_no,
      gender,
      course,
      avatar: {
        public_id: null,
        secure_url: 'avatarUrl',
      },
    });

    if (!createEmployee) {
      return next(new Error('Employee creation failed'));
    }

    // Handle file upload to Cloudinary
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'mechinetest',
        });

        if (result) {
          createEmployee.avatar.public_id = result.public_id;
          createEmployee.avatar.secure_url = result.secure_url;
          await createEmployee.save();
        }

        // Remove the file from the local uploads folder after uploading to Cloudinary
        await fs.promises.unlink(req.file.path); // Use unlink to remove the file
      } catch (err) {
        console.error('Error handling file upload:', err.message);
        return next(new Error('File upload failed'));
      }
    }

    // Respond with a success message
    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      employee: createEmployee,
    });

  } catch (error) {
    console.error('Error in createEmployee:', error.message, error.stack);
    return next(new Error(error.message || 'Something went wrong'));
  }
};

export const employeList = async (req, res, next) => {
  try {
    const employees = await Employee.find();

    res.status(200).json({
      success: true,
      message: 'Employee list retrieved successfully',
      employees,
    });
  } catch (error) {
    console.error('Error in employeList:', error.message, error.stack);
    return next(new errorMiddleware('Something went wrong while fetching the employee list', 500));
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Update employee details in the database
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return next(new Error('Employee not found', 404));
    }

    // Handle file upload if a file is provided
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'mechinetest',
        });

        if (result) {
          updatedEmployee.avatar = {
            public_id: result.public_id,
            secure_url: result.secure_url,
          };
          await updatedEmployee.save();
        }

        // Remove the file from the local uploads folder after uploading to Cloudinary
        await fs.promises.unlink(req.file.path);
      } catch (err) {
        console.error('Error handling file upload:', err.message);
        return next(new Error('File upload failed'));
      }
    }

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error('Error in updateEmployee:', error.message, error.stack);
    return next(new Error('Something went wrong while updating the employee', 500));
  }
};
export const deleteItem = async (req, res, next) => { 
  try {
      const id = req.params.id; // Corrected "prams" to "params"
      const data = await mongoose.model('YourModel').findByIdAndDelete(id); // Use the correct model name

      if (!data) {
          return res.status(404).json({
              success: false,
              message: 'Item not found',
          });
      }

      res.status(200).json({
          success: true,
          message: 'Item deleted successfully',
      });
  } catch (err) {
      next(err); // Pass the error to your error handling middleware
  }
};