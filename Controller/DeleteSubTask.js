const Subtask = require('../Model/Subtask');

async function DeleteSubTask(req, res, next){
  const { id } = req.params;

  try {
    const task = await Subtask.findByIdAndUpdate(
      id,
      { deleted_at: Date.now()},
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Subtask not found' });
    }

    return res.status(200).json({ message: 'Subtask deleted successfully' });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: error.message });
    next(error);
  }
}

module.exports = DeleteSubTask;

/*
Sample input:

delete-task/65bab8413cb21af749c367a9
*/