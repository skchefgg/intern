import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from "axios";
import { API } from '../utils/ApiURI';
import Loader from '../components/Loader';  

const Login = () => {
  const refEmail = useRef(null);
  const refPassword = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);  

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const email = refEmail.current.value;
    const password = refPassword.current.value;

    if (!email || !password) {
      toast.error('Email and password are required');
      return;
    }

    setLoading(true);  

    try {
      const response = await axios.post(`${API}/login`, {
        email: email,
        password: password,
      });

      
      if (response.status === 200) {

        
        localStorage.setItem('token', response.data.data.accessToken);
        localStorage.setItem('userId', response.data.data.user._id);

        navigate('/');
        toast.success('Successfully Logged In!');
        window.location.reload()
      }
    } catch (err) {
      
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 404) {
          toast.error('User does not exist');
        } else if (err.response.status === 401) {
          toast.error(err.response.data.message || 'Password Incorrect');
        }
      } else {
        toast.error('An error occurred');
      }
    } finally {
      setLoading(false);  
    }
  };

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Login
        </h2>

        <form onSubmit={handleOnSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your email
            </label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              ref={refEmail}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ref={refPassword}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          New User?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-500">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;