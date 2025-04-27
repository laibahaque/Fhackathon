import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#E0E7FF] to-[#F8FAFC]">
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1C398E] mb-6 drop-shadow-2xl">
          Welcome to <span className="text-[#1C398E]">TrackIt</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-600 mb-10">
        From To-Do to Done — Effortlessly.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link
            to="/signup"
            className="px-8 py-4 bg-[#1C398E] text-white font-bold rounded-lg shadow-xl hover:bg-[#172F6C] hover:scale-110 transform transition duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 bg-white text-[#1C398E] font-bold rounded-lg shadow-xl hover:bg-[#E2E8F0] hover:scale-110 transform transition duration-300"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
