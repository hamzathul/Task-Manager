import axios from "../../lib/axios";
import {
  fetchTasksStart,
  fetchTasksSuccess,
  fetchTasksFailure,
  addTask,
  updateTask as updateTaskAction,
  deleteTask as deleteTaskAction,
} from "../slices/taskSlice";

// Fetch tasks with optional filters
export const fetchTasks =
  (filters = {}) =>
  async (dispatch) => {
    try {
      dispatch(fetchTasksStart());
      const queryString = new URLSearchParams(filters).toString();
      const { data } = await axios.get(`/filter?${queryString}`);
      dispatch(fetchTasksSuccess(data));
    } catch (error) {
      dispatch(
        fetchTasksFailure(
          error.response?.data?.message || "Error fetching tasks"
        )
      );
    }
  };

// Add a new task
export const createTask = (taskData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/tasks", taskData);
    dispatch(addTask(data));
  } catch (error) {
    console.error(error.response?.data?.message || "Error creating task");
  }
};

// Update an existing task
export const updateTask = (taskId, updateData) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/tasks/${taskId}`, updateData);
    dispatch(updateTaskAction({ id: taskId, data }));
  } catch (error) {
    console.error(error.response?.data?.message || "Error updating task");
  }
};

// Delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${taskId}`);
    dispatch(deleteTaskAction(taskId));
  } catch (error) {
    console.error(error.response?.data?.message || "Error deleting task");
  }
};


// TODO