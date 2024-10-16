import { useState, useEffect } from 'react';
import UserContext from './user.appContext';
import axios from 'axios';

const AppState = ({ children }) => {
  const Url = 'http://localhost:5014/api/v1/user'; 
  const [token, setToken] = useState(null); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser); 
      console.log("User data retrieved from localStorage:", storedUser); // Debug log
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${Url}/login`, { email, password }); 
      
      setToken(response.data.token); 
      setUser(response.data.user); 
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); 
      console.log("User logged in:", response.data.user); 
      return true; 
    } catch (error) {
      console.error('Login failed:', error); 
      return false; 
    }
  };

  const logout = () => {
    setToken(null); 
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("User logged out"); 
  };

  return (
    <UserContext.Provider value={{ token, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default AppState;

