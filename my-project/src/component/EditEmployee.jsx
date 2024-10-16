import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams(); // Get employeeId from URL parameters
  console.log('Editing employee with ID:', id); // Log the ID

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile_no: '',
    designation: '',
    gender: '',
    course: '',
    avatar: null,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fetch employee details when component mounts
  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!id) {
        console.error("No employee ID provided");
        setError("Invalid employee ID");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5014/api/v1/employee/employeList/${id}`);
        
        // Ensure all fields are set, fallback to empty strings if necessary
        setFormData({
          name: response.data.name || '',
          email: response.data.email || '',
          mobile_no: response.data.mobile_no || '',
          designation: response.data.designation || '',
          gender: response.data.gender || '',
          course: response.data.course || '',
          avatar: null,
        });
      } catch (err) {
        console.error("Error fetching employee details:", err.response ? err.response.data : err);
        setError();
      }
    };

    fetchEmployeeData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files[0] : value,
    }));
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting employee data:", formData);

    if (!id) {
      console.error("employeeId is undefined when submitting");
      setError("Invalid employee ID");
      return;
    }

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('mobile_no', formData.mobile_no);
      data.append('designation', formData.designation);
      data.append('gender', formData.gender);
      data.append('course', formData.course);
      if (formData.avatar) {
        data.append('avatar', formData.avatar);
      }

      await axios.put(`http://localhost:5014/api/v1/employee/updateEmployee/:id/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Employee details updated successfully!');
    } catch (error) {
      console.error('Error updating employee details:', error);
      setError(error.response ? error.response.data.message : 'An unexpected error occurred.');
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center h-[100vh] border-4 border-yellow-300 shadow-xl rounded-lg p-8 bg-white">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Employee Details</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

          {/* Input fields for editing employee details */}
          <input id="name" type="text" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input id="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input id="mobile_no" type="text" value={formData.mobile_no} onChange={handleChange} placeholder="Mobile No." required />
          <input id="designation" type="text" value={formData.designation} onChange={handleChange} placeholder="Designation" required />
          <input id="gender" type="text" value={formData.gender} onChange={handleChange} placeholder="Gender" required />
          <input id="course" type="text" value={formData.course} onChange={handleChange} placeholder="Course" required />
          <input id="avatar" type="file" onChange={handleChange} />

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
};

export default EditEmployee;
