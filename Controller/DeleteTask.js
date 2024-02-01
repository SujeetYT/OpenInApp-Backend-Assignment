const Task = require('../Model/Task');

async function DeleteTask(req, res, next){
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: error.message });
    next(error);
  }
}

module.exports = DeleteTask;