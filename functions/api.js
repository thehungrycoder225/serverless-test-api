const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authors = require('./routes/author');
const users = require('./routes/user');
const auth = require('./routes/auth');
const generateKey = require('./middleware/generateKey');
const sign = require('./middleware/sign');
const verify = require('./middleware/verify');

dotenv.config();
const app = express();
const dbLocalUrl = 'mongodb://localhost:27017/express-mongo-api';

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI || dbLocalUrl, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/functions/api/authors', authors);
app.use('/.netlify/functions/api/users', users);
app.use('/.netlify/functions/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);

module.exports.handler = serverless(app);
