const express = require('express');
const AuthorModel = require('../models/author');
const validateAuthor = require('../models/author');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const router = express.Router();

// GET all authors
router.get('/', auth, admin, async (req, res) => {
  try {
    const authors = await AuthorModel.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single author
router.get('/:id', auth, admin, getAuthor, (req, res) => {
  res.json(res.author);
});

// CREATE an author
router.post('/', async (req, res) => {
  try {
    const { error } = validateAuthor(req.body);
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.details[0].message,
      });
    }
    const author = new AuthorModel({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    });
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an author
router.patch('/:id', auth, admin, getAuthor, async (req, res) => {
  try {
    if (req.body.name != null) {
      res.author.name = req.body.name;
    }
    const updatedAuthor = await res.author.save();
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', getAuthor, async (req, res) => {
  try {
    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an author
router.delete('/:id', auth, admin, getAuthor, async (req, res) => {
  try {
    await AuthorModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete All Authors
router.delete('/', auth, admin, async (req, res) => {
  try {
    await AuthorModel.deleteMany();
    res.json({ message: 'All authors deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single author by ID
async function getAuthor(req, res, next) {
  try {
    const author = await AuthorModel.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.author = author;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = router;
