const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const User = require('../models/user');
const validateUser = require('../models/user').validate;
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', auth, admin, async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({
        status: 'error',
        error: error.details[0].message,
      });

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).send({
        status: 'error',
        error: 'Email is Already In Use',
      });

    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = user.generateAuthToken();
    res
      .status(200)
      .header('x-auth-token', token)
      .send({
        status: 'success',
        message: 'User registered successfully',
        user: _.pick(user, ['_id', 'name', 'email']),
      });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
});

router.get('/', auth, admin, async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

router.get('/me', async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.delete('/:id', auth, admin, async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).send('The user with the given ID was not found.');
  }
  res.send({
    message: 'User deleted.',
    user,
  });
});

module.exports = router;
