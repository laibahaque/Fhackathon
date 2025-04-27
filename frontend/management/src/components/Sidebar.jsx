import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [userName, setUserName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
    }
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Profile', path: '' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`md:w-64 lg:w-80 bg-[#1C398E] min-h-screen p-4 md:p-6 transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
      {/* Hamburger Icon on Mobile */}
      <div className="md:hidden flex justify-between items-center mb-6">
        <button onClick={toggleSidebar} className="text-white text-2xl">
          {isSidebarOpen ? '✖️' : '☰'}
        </button>
        <h1 className="text-white text-2xl font-bold text-center">TrackIt</h1>
      </div>

      {/* Sidebar Content */}
      <div className="text-white text-center mb-4 md:mb-6 text-sm md:text-base">
        Welcome {userName}
      </div>

      <nav className="flex flex-col gap-2 md:gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-white text-sm md:text-base p-2 rounded hover:bg-blue-700 ${
              location.pathname === item.path ? 'bg-blue-800' : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
