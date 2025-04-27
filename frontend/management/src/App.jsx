// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-100 min-h-screen">
              <Topbar />
              <div className="p-6">
                <Dashboard />
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
