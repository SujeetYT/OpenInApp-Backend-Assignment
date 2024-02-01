const User = require('../Model/User');

async function CreateUser(req, res, next) {
  const { name, password, phoneNumber, priority } = req.body;
  
  try {
    const user = new User({
      name,
      password,
      phoneNumber,
      priority,
    });

    // Save the user to the database
    await user.save();

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error);
    next(error)
  }
}

module.exports = CreateUser;

/*
Sample Input:

{
  "name": "Ajit Kumar",
  "password": "123456",
  "phoneNumber": "9318425233",
  "priority": 0
}

*/