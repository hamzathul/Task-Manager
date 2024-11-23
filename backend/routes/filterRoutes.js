import express from 'express'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get("/filter", protect, async (req, res) => {
  const { status, startDate, endDate } = req.query;

  try {
    const filterCriteria = { userId: req.user._id };

    // Add status filter if provided
    if (status) {
      filterCriteria.status = status;
    }

    // Add date range filter if provided
    if (startDate && endDate) {
      filterCriteria.dueDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const tasks = await Task.find(filterCriteria);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching filtered tasks", error });
  }
});

export default router