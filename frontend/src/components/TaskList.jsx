import React, { useState } from "react";
import TaskForm from "./TaskForm";

const TaskList = ({ title, tasks, onUpdate, onDelete }) => {
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  const handleUpdate = (updatedData) => {
    onUpdate(editingTask._id, updatedData); // Dispatch the update action
    setEditingTask(null); // Reset editing state
  };

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
            <button
              onClick={() => handleEdit(task)}
              className="bg-yellow-600 px-4 py-2 rounded-lg text-sm mr-2"
            >
              Edit
            </button>
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

      {/* Show Edit Form if editingTask is set */}
      {editingTask && (
        <TaskForm
          onSubmit={handleUpdate}
          initialData={editingTask} // Pass the task to prefill
          isEditMode={true}
        />
      )}
    </div>
  );
};

export default TaskList;
