// src/components/TaskBoard.jsx
import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const TaskBoard = ({ tasks, setTasks }) => {
  const statuses = ['To Do', 'In Progress', 'Done'];

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedTasks = tasks.map((task) => {
        if (task.id === draggableId) {
          return { ...task, status: destination.droppableId };
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  const addTask = () => {
    const newTask = {
      id: Date.now().toString(), // simple unique id
      title: 'New Task',
      description: 'Description...',
      status: 'To Do',
      assignedTo: 'Unassigned',
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
        {statuses.map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-white rounded-2xl shadow-lg p-3 md:p-4 min-h-[400px] md:min-h-[500px] flex flex-col items-center"
              >
                <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-[#1C398E] text-center">
                  {status}
                </h2>

                {/* Add Button only for "To Do" */}
                {status === 'To Do' && (
                  <button
                    onClick={addTask}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition"
                  >
                    ➕ Add Task
                  </button>
                )}

                {/* Task Cards */}
                <div className="flex flex-col gap-4 w-full">
                  {tasks
                    .filter((task) => task.status === status)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard task={task} tasks={tasks} setTasks={setTasks} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
