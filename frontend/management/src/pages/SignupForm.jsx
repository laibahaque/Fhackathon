import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);
      alert('Account created successfully!');
      setFormData({
        name: '',
        dob: '',
        gender: '',
        email: '',
        password: '',
        confirmpassword: ''
      });

      navigate('/login');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        alert('This email is already registered. Please use a different email.');
      } else {
        alert('Failed to create account. Please try again.');
      }
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
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
          />

          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
          />

          <div className="flex items-center gap-6">
            <label className="text-gray-700 font-medium">Gender:</label>
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
                required
              />
              Male
            </label>
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
                required
              />
              Female
            </label>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
          />

          <input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1C398E] transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-[#1C398E] text-white font-bold rounded-2xl hover:bg-[#162d72] transition-all duration-300"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-[#1C398E] font-semibold hover:underline">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
