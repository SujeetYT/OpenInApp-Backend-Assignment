const Task = require('../Model/Task');
const {calculatePriority} = require('../Utils/CalculatePriority');

// Function to create a task
const createTask = async (req, res, next) => {

  const { title, description, due_date } = req.body;
  const { _id } = req.user;
  const priority = calculatePriority(due_date);

  try {
    // Create a new task
    const task = new Task({
      title,
      description,
      due_date,
      priority,
      user: _id,
    });
  
    // Save the task to the database
    await task.save();
  
    return res.status(201).json({ message: 'Task created successfully', task});
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = createTask;


/*
Sample input: 

{
  "title": "Test",
  "description": "Test Time",
  "due_date": "1706963009354"
}


*/