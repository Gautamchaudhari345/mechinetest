import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from '../context/user.appContext'; 

const Navbar = () => {
  const { user, logout } = useContext(UserContext); 

  console.log("Current user in Navbar:", user); // Debug log

  return (
    <div className="border-b-2 border-gray-500 flex justify-between py-4 bg-slate-500 shadow-md">
      <ul className="mx-2 flex flex-row gap-8 text-lg font-medium text-gray-700">
        <li className="hover:text-blue-500 cursor-pointer transition duration-300">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-blue-500 cursor-pointer transition duration-300">
          <Link to="/employee-list">Employee List</Link>
        </li>
      </ul>
      <ul className="mx-2 flex flex-row gap-8 text-lg font-medium text-gray-700 items-center">
        {user ? ( 
          <>
            <li className="text-white">{user.name}</li> {/* Display the logged-in user's name */}
            <li
              className="hover:text-blue-500 cursor-pointer transition duration-300"
              onClick={logout} 
            >
              Logout
            </li>
          </>
        ) : (
          <li className="hover:text-blue-500 cursor-pointer transition duration-300">
            <Link to="/login">Login</Link> 
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
