import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user.appContext';

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(null); // State to store the login message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password); 
    if (success) {
      setLoginMessage('Login successful! Redirecting to the home page...');
      setTimeout(() => {
        navigate('/');
      }, 1000); 
    } else {
      setLoginMessage('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
      <form
        noValidate
        onSubmit={handleSubmit}
        className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'
      >
        <h1 className="text-center text-2xl font-bold">Login page</h1>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='font-semibold'>User name </label>
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="Enter your email.."
            value={email}
            onChange={handleChange}
            className="bg-transparent px-2 py-1 border"
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='font-semibold'>Password </label>
          <input
            type="password"
            required
            name="password"
            id="password"
            placeholder="Enter your password.."
            value={password}
            onChange={handleChange}
            className="bg-transparent px-2 py-1 border"
          />
        </div>

        {loginMessage && <p className='text-center mt-2'>{loginMessage}</p>}

        <button type="submit" className='mt-2 bg-green-500 hover:bg-green-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
          Login
          
        </button>
      </form>
    </div>
  );
};

export default Login;
