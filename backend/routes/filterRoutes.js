import express from 'express'
import protect from '../middleware/authMiddleware.js'
import Task from '../models/Task.js';

const router = express.Router()

router.get("/", protect, async (req, res) => {
  try {
    // Extract filters from query parameters
    const { status, category, date } = req.query;

    // Build the query object dynamically
    const query = {};
    if (status) query.status = status;
    if (category) query.category = category;
    if (date) {
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.deadline = { $gte: startOfDay, $lte: endOfDay };
    }

    // Fetch tasks based on the query
    const tasks = await Task.find(query);

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

export default router