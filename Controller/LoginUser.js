const User = require("../Model/User");
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

async function LoginUser(req, res, next){
  const { phoneNumber, password } = req.body;

  if(!phoneNumber || !password){
    return next({ message: 'Missing phone number or password' });
  }

  if(phoneNumber.length !== 10){
    return next({ message: 'Invalid phone number' });
  }

  if(password.length < 6){
    return next({ message: 'Password must be at least 6 characters long' });
  }
  
  try {
    const user = await User.findOne({ phoneNumber });
    if(!user){
      return res.status(404).json({ message: 'User not found' });
    }

    if(user.password !== password){
      return res.status(401).json({ message: 'Password is incorrect' });
    }
    const payload = {
      _id: user._id,
      phoneNumber: user.phoneNumber
    }
    // console.log(secretKey);
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' });

    return res.status(200).json({ message: 'Logged in successfully', token: token });
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

module.exports = LoginUser;


/*
Sample input: 

{
  "phoneNumber": "9876543210",
  "password": "123456"
}


*/