import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../redux/actions/taskActions";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    status: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    dispatch(fetchTasks(filter)); // Fetch tasks with filters on component load
  }, [dispatch, filter]);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="w-full max-w-5xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>

        {/* Task Creation Form */}
        <TaskForm onSubmit={(taskData) => dispatch(createTask(taskData))} />

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-6">
          <select
            name="status"
            onChange={handleFilterChange}
            value={filter.status}
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            name="category"
            onChange={handleFilterChange}
            value={filter.category}
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          >
            <option value="">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
          <input
            type="date"
            name="date"
            onChange={handleFilterChange}
            value={filter.date}
            className="px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />
        </div>

        {/* Task Lists */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <TaskList
            title="To Do"
            tasks={tasks.filter((task) => task.status === "To Do")}
            onUpdate={(taskId, data) => dispatch(updateTask(taskId, data))}
            onDelete={(taskId) => dispatch(deleteTask(taskId))}
          />
          <TaskList
            title="In Progress"
            tasks={tasks.filter((task) => task.status === "In Progress")}
            onUpdate={(taskId, data) => dispatch(updateTask(taskId, data))}
            onDelete={(taskId) => dispatch(deleteTask(taskId))}
          />
          <TaskList
            title="Completed"
            tasks={tasks.filter((task) => task.status === "Completed")}
            onUpdate={(taskId, data) => dispatch(updateTask(taskId, data))}
            onDelete={(taskId) => dispatch(deleteTask(taskId))}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
