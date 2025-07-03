import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', input);
      login(res.data.user, res.data.token);
      toast.success('Login successful');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 font-barlow">
      <form
        onSubmit={handleSubmit}
        className="bg-dark-blue p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center">Welcome Back</h2>
        <p className="text-sm text-center text-gray-400">Login to continue chatting</p>

        {/* Username Field */}
        <div className="relative">
          <FaUserAlt className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            required
            className="bg-black text-white border border-gray-600 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            required
            className="bg-black text-white border border-gray-600 rounded-lg pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all"
        >
          Login
        </button>

        <p className="text-xs text-center text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} Love Finder
        </p>
      </form>
    </div>
  );
};

export default Login;
