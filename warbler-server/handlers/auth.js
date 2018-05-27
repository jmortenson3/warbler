const db = require('../models'); // same thing as ../models/index
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
  try {
    // finds a user
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    // checks if their password is right
    if (isMatch) {
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, process.env.SECRET_KEY);
      
      // if so, log them in
      return res.status(200).json({
        id,
        username, 
        profileImageUrl,
        token
      });
    }
    else {
      return next({
        status: 400,
        message: 'Invalid email or password.  Please verify your credentials.'
      });
    }
  }
  catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }

};

exports.signup = async function(req, res, next) {
  try {
    // create a user
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    }, process.env.SECRET_KEY);

    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
    // create (sign) a token
    //process.env.___
    
  } catch(err) {
    // if it is a certain error, we can respond with username/email taken
    if (err.code === 11000) {
      err.message = 'Sorry, that username and/or email is taken';
    }
    
    //otherwise send back generic 400
    return next({
      status: 400,
      message: err.message
    })
    
  }
};