// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TaskBoard from '../components/TaskBoard';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Task 1', description: 'Description of Task 1', status: 'To Do', assignedTo: 'John' },
    { id: '2', title: 'Task 2', description: 'Description of Task 2', status: 'In Progress', assignedTo: 'Alice' },
    { id: '3', title: 'Task 3', description: 'Description of Task 3', status: 'Done', assignedTo: 'Bob' },
  ]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-6 md:ml-45 lg:flex">
        <div className="w-full max-w-6xl">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center text-[#1C398E] mb-6 md:mb-8">
            TrackIt Dashboard
          </h1>
          <TaskBoard tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
