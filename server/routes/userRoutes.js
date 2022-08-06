const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (result) {
      res.send(result);
    } else {
      res.status(500).json('Error');
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    let newUser = new User(req.body);
    await newUser.save();
    res.send('User Registered Successfully!');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
