import React, { useState, useEffect } from 'react';

const Topbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('employee');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Attempt to parse if storedUser exists
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('employee');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="w-full bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <h2 className="text-lg md:text-xl font-bold text-[#1C398E]">📋 Dashboard</h2>

      <div className="flex items-center gap-3 md:gap-4">
        {user ? (
          <span className="text-gray-600 text-sm md:text-base">Welcome, {user.name}</span>
        ) : (
          <span className="text-gray-600 text-sm md:text-base">Welcome, User</span>
        )}

        <button
          onClick={handleLogout}
          className="bg-[#1C398E] text-white text-sm md:text-base px-3 py-1 md:px-4 md:py-2 rounded hover:bg-blue-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
