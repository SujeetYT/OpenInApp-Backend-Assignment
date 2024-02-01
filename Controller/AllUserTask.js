const Task = require('../Model/Task');
//Get all user task(with filter like priority, due date and proper pagination etc)

const AllUserTask = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const skip = page * limit;
    const { priority, dueDate } = req.query;

    let query = { user: req.user._id, isDeleted: false };

    if (priority) {
      query.priority = priority;
    }

    if (dueDate) {
      query.due_date = Number(dueDate);
    }

    console.log({ query });

    const alltasks = await Task.find(query)
      .skip(skip)
      .limit(limit);

    res.status(200).json({ alltasks });
  } catch (error) {
    next(error);
  }
};

module.exports = AllUserTask;