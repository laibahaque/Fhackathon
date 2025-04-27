// src/components/TaskCard.jsx
import React, { useState } from 'react';

const TaskCard = ({ task, tasks, setTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleDelete = () => {
    setTasks(tasks.filter((t) => t.id !== task.id));
  };

  const handleSave = () => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, title: editedTitle, description: editedDescription } : t
    );
    setTasks(updatedTasks);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-3 md:p-4 mb-4 shadow-md">
      {task.status === 'To Do' && isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded text-[#1C398E] font-bold"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full mb-2 p-2 border rounded text-sm"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
            >
              ✅ Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white text-xs px-3 py-1 rounded"
            >
              ❌ Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="font-bold text-[#1C398E] text-base md:text-lg">{task.title}</h3>
          <p className="text-gray-600 text-sm">{task.description}</p>
          <p className="text-xs text-gray-500 mt-2">👤 {task.assignedTo}</p>

          <div className="flex flex-wrap justify-between items-center mt-4 gap-2">
            {task.status === 'To Do' && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded hover:bg-yellow-200 transition"
              >
                ✏️ Edit
              </button>
            )}
            <button
              onClick={handleDelete}
              className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition"
            >
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskCard;
