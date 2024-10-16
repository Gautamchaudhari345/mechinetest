import { useState } from "react";
import axios from "axios";

function CreateEmployee() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',  // Changed from mobile to mobile_no
    designation: '',
    gender: '',
    course: '',
    avatar: null, // Consistent with backend naming
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files[0] : value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmployee();
      setSuccessMessage("Employee created successfully!");
      setFormData({
        name: '',
        email: '',
        mobile_no: '', // Reset mobile_no
        designation: '',
        gender: '',
        course: '',
        avatar: null,
      });
    } catch (error) {
      console.error('Error creating employee:', error);
      setError(error.response ? error.response.data.message : "An unexpected error occurred.");
    }
  };

  const createEmployee = async () => {
    const url = 'http://localhost:5014/api/v1/empolyee/createEmployee'; // Corrected endpoint
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile_no", formData.mobile_no); // Ensure this matches backend
    data.append("designation", formData.designation);
    data.append("gender", formData.gender);
    data.append("course", formData.course);
    if (formData.avatar) {
      data.append("avatar", formData.avatar); // Ensure this matches backend
    }

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Employee created successfully:', response.data);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center h-[100vh] border-4 border-yellow-300 shadow-xl rounded-lg p-8 bg-white">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Employee</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              placeholder="Enter employee email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="mobile_no" className="block text-lg font-medium text-gray-700 mb-2">Mobile No</label>
            <input
              type="tel"
              id="mobile_no" // Ensure this matches backend
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              placeholder="Enter employee mobile number"
              value={formData.mobile_no} // Ensure this matches backend
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </div>
          <div>
            <label htmlFor="designation" className="block text-lg font-medium text-gray-700 mb-2">Designation</label>
            <input
              type="text"
              id="designation"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              placeholder="HR/Manager/Sales"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-lg font-medium text-gray-700 mb-2">Gender</label>
            <select
              id="gender"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="course" className="block text-lg font-medium text-gray-700 mb-2">Course</label>
            <input
              type="text"
              id="course"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              placeholder="Enter employee course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-lg font-medium text-gray-700 mb-2">Image Upload</label>
            <input
              type="file"
              id="avatar" // Ensure this matches backend
              accept="image/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-400 text-white font-semibold rounded-md shadow-md hover:bg-yellow-500 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
