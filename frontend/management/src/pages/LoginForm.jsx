import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });

      if (response.data.success) {
        // ✅ Save employee and token
        localStorage.setItem('employee', JSON.stringify(response.data.employee));
        localStorage.setItem('token', response.data.token);

        alert('✅ Login successful');
        navigate('/dashboard');
      } else {
        alert('❌ Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('❌ Error during login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative flex flex-col justify-center items-center p-6">
      {/* Simple Home Arrow */}
      <div
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-[#1C398E] cursor-pointer hover:text-[#162d72] transition-all duration-300"
      >
        <ArrowLeft size={30} />
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-lg mt-12">
        <h1 className="text-3xl font-extrabold text-center mb-8 text-[#1C398E] tracking-wide">
          Log In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#1C398E] text-white font-bold rounded-2xl hover:bg-[#162d72] transition-all duration-300"
          >
            Log In
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link className="text-[#1C398E] font-semibold hover:underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
