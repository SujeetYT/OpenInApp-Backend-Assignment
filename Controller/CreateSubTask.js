const Subtask = require("../Model/Subtask");

async function CreateSubTask(req, res, next){
  const { id } = req.body;

  try {
    const subtask = new Subtask({ task_id: id });
  
    // Save the subtask to the database
    await subtask.save();
  
    return res.status(201).json({ message: 'Subtask created successfully', subtask });
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

module.exports = CreateSubTask;


/*
Sample input:

{
  "id": "65baa1a737340fa1c9db4dc5"
}

*/