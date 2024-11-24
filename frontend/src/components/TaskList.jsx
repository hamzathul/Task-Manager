import React from "react";

const TaskList = ({ title, tasks, onUpdate, onDelete }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-gray-700 p-4 mb-4 rounded-lg text-white flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p className="text-sm">{task.description}</p>
            <p className="text-sm text-gray-400">Due: {task.dueDate}</p>
          </div>
          <div>
            <button
              onClick={() => onUpdate(task._id, { status: "In Progress" })}
              className="bg-blue-600 px-4 py-2 rounded-lg text-sm mr-2"
            >
              Move to In Progress
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-600 px-4 py-2 rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
