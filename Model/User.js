const mongoose = require('mongoose');

/*
id (int, unique identifier)
phone_number (num)
priority (0,1,2) //for twilio calling priority
*/

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  password: {
    type: String,
    require: [true, 'Please add a password'],
  },
  phoneNumber: {
    type: Number,
    unique: true,
    required: [true, 'Please add a phone number'],
  },
  priority: {
    type: Number,
    enum: [0, 1, 2],
    required: [true, 'Please add a priority'],
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', User);


/*
Sample Input:

{
    "name": "John Doe",
    "password": "123456",
    "phoneNumber": "1234567890",
    "priority": 2
}

*/