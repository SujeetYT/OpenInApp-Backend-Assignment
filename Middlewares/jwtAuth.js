const jwt = require('jsonwebtoken');

function jwtAuth(req, res, next){
  try {
    const authHeader = req.headers.authorization;
    if(authHeader){
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      
      if(!decoded){
        next(new Error(401, 'Unauthorized: Invalid token'));
      }
      
      req.user = decoded;
      next();
    }else{
      next(new Error(401, 'Unauthorized: Missing token'));
    }
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

module.exports = { jwtAuth };