const express = require('express');    
const User = require('../models/User')
const router = express.Router();

const { body, validationResult } = require('express-validator');

// Create a User using POST "/api/auth". Doesn't require Auth


router.post('/', [
    body('name', 'Name Should be atleast Three Characters').isLength({ min: 3 }),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password Should be atleast Five Characters').isLength({ min: 5 }),
] , (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err => {console.log(err)
      res.json({err: "Please Enter a Unique Value for Email", messsage: err.message})
      })
})

module.exports = router