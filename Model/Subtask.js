const mongoose = require('mongoose');

/*
id (int, unique identifier)
task_id (int)//references task table
status (0,1) //0- incomplete, 1- complete
created_at (date/string)
updated_at (date/string)
deleted_at (date/string)
*/
const Subtask = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: [true, 'Please add a task id'],
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  created_at: {
    type: Number,
    default: Date.now(),
    required: true,
  },
  updated_at: {
    type: Number,
    default: Date.now(),
    required: true,
  },
  deleted_at: {
    type: Number,
    default: 0,
    required: true,
  }
});

module.exports = mongoose.model('Subtask', Subtask);