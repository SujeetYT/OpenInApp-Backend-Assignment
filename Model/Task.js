const mongoose = require('mongoose');

// Create task - input is title, description and due_date with jwt auth token
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  due_date: {
    type: Number,
    required: [true, 'Please add a due date'],
  },
  status:{
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO'
  },
  // for soft delete
  isDeleted:{
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please add a user']
  },
  priority: {
    type: Number,
    default: 0
  },
});

module.exports = mongoose.model('Task', TaskSchema);