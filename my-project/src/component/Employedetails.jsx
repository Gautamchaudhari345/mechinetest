// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Employedetails = () => {
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get('http://localhost:5014/api/v1/employeList');
//         console.log('Response data:', response.data); // Check the response structure
        
//         // Check response structure before setting employees
//         if (response.data && response.data.employees) {
//           setEmployees(response.data.employees);
//         } else if (response.data && response.data.data && response.data.data.employees) {
//           setEmployees(response.data.data.employees);
//         } else {
//           throw new Error('Unexpected response structure');
//         }
//       } catch (err) {
//         setError('Error fetching employees. Please try again later.');
//         console.error(err); // Log the error for debugging
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   console.log('Employees:', employees); // Debugging statement to check the employee data

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Employee List</h1>
//       <ul className="list-disc list-inside">
//         {employees.length > 0 ? (
//           employees.map((employee) => (
//             <li key={employee._id} className="py-2">
//               {employee.name} - {employee.designation} {/* Ensure these fields exist */}
//             </li>
//           ))
//         ) : (
//           <li>No employees found.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Employedetails;
