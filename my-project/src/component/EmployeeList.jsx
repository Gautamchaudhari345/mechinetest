import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5014/api/v1/empolyee/employeList/:id');
        console.log('Response data:', response.data); 

        if (response.data && response.data.employees) {
          setEmployees(response.data.employees);
          setFilteredEmployees(response.data.employees);
        } else if (response.data && response.data.data && response.data.data.employees) {
          setEmployees(response.data.data.employees);
          setFilteredEmployees(response.data.data.employees);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (err) {
        setError(`Error fetching employees: ${err.message}`);
        console.error('Fetch error:', err); // Log the error for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((employee) =>
        employee.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5014/api/v1/employee/delete/:id/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== id));
    } catch (err) {
      setError(`Error deleting employee: ${err.message}`);
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>
      <div className="flex justify-end items-end mb-4">
        <Link to="/create-employee">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Create Employee
          </button>
        </Link>
      </div>
      <div className="flex justify-end items-end mb-4">
        <input
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 px-4 py-2 rounded-l"
        />
        <button className="bg-gray-300 px-4 py-2 rounded-r hover:bg-gray-400">Search</button>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Images</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Mobile No</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Designation</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Create Date</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee) => (
              <tr key={employee._id} className="border-t">
                <td className="border border-gray-300 px-4 py-2">{employee._id || 'Not found'}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {employee.avatar ? (
                    <img src={employee.avatar} alt="Employee Avatar" className="w-16 h-16 object-cover rounded-full" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">{employee.name || 'Not found'}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.email || 'Not found'}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.mobile_no || 'Not found'}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.designation || 'Not found'}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.gender || 'Not found'}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.course || 'Not found'}</td>
                <td className="border border-gray-300 px-4 py-2">{employee.create_date || 'Not found'}</td>
                <td className=" flex flex-row border border-gray-300 px-4 py-2">
                  <Link to={`/employee-edit/${employee._id}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2">Edit</button>
                  </Link>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
