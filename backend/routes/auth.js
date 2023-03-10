const express = require('express');    
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Blackb33-1337';

// Create a User using POST "/api/auth/createuser ". Doesn't require Auth
router.post('/createuser', [
    body('name', 'Name Should be atleast Three Characters').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password Should be atleast Five Characters').isLength({ min: 5 }),
] , async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check if User with same email already exists 
    try{

    let user = await User.findOne({email: req.body.email});
    
    if (user){
      return res.status(400).json({error: "sorry, email is registered already"})
    }

    var salt = await bcrypt.genSaltSync(10);
    secPass = await bcrypt.hash(req.body.password, salt) 

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data = {
          user: {
            id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      
      res.json({authtoken})
    }
    catch(error){
      console.log(error.message)
      res.status(500).send("Some Error Occured");

    }
      // .then(user => res.json(user))
      // .catch(err => {console.log(err)
      // res.json({err: "Please Enter a Unique Value for Email", messsage: err.message})
      // })
})

module.exports = router