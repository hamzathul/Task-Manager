import express from 'express'
import protect from '../middleware/authMiddleware.js'
import Task from '../models/Task.js';

const router = express.Router()

router.get("/", protect, async (req, res) => {
  try {
    // Extract filters from query parameters
    const { status, category, date } = req.query;

    // Build the query object dynamically
    const query = { userId: req.user._id };
    if (status) query.status = status;
    if (category) query.category = category;
    if (date) {
      const targetDate = new Date(date);

      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      console.log("Start of day:", startOfDay);
      console.log("End of day:", endOfDay);

      query.dueDate = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    // Fetch tasks based on the query
    const tasks = await Task.find(query);
    console.log(tasks)  

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

export default router