const Subtask = require('../Model/Subtask');

async function UpdateSubtask(req, res, next){
  const { id } = req.params;
  const { status } = req.body;

  try {
    const subtask = await Subtask.findByIdAndUpdate(
      id, 
      { status: status }, 
      { new: true }
    );

    if (!subtask) {
      return res.status(404).json({ message: 'Subtask not found' });
    }

    return res.status(200).json({ message: 'Subtask updated successfully', subtask });
  } catch (error) {
    console.log(error);
    // return res.status(500).json({ message: error.message });
    next(error);
  }
}

module.exports = UpdateSubtask;

/*
Sample input:

{
  "status": 0
}

*/







