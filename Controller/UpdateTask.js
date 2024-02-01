const Task = require('../Model/Task');

async function UpdateTask(req, res, next) {
  const { id } = req.params;
  const { status, due_date } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id },
      { due_date, status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    next(error);
  }
}

module.exports = UpdateTask;

/*
Sample input:

api/v1/update-task/65baa1a737340fa1c9db4dc5

{
  "status": "DONE",
  "due_date": 1706755935
}

*/