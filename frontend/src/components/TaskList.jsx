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
            <p
              className={`text-sm ${
                new Date(task.dueDate) < new Date()
                  ? "text-red-500"
                  : "text-gray-400"
              }`}
            >
              Due: {new Date(task.dueDate).toLocaleDateString("en-US")}
            </p>
          </div>
          <div>
            {task.status !== "In Progress" && (
              <button
                onClick={() => onUpdate(task._id, { status: "In Progress" })}
                className="bg-blue-600 px-4 py-2 rounded-lg text-sm mr-2"
              >
                Move to In Progress
              </button>
            )}

            {task.status !== "Completed" && (
              <button
                onClick={() => onUpdate(task._id, { status: "Completed" })}
                className="bg-green-600 px-4 py-2 rounded-lg text-sm mr-2"
              >
                Completed
              </button>
            )}

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
