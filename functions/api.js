const express = require('express');
const serverless = require('serverless-http');
import router from './routes/author.js';

const app = express();

mongoose
  .connect(
    'mongodb+srv://cryx25:enovation25@cluster0.mdjfo.azure.mongodb.net/testDB' ||
      'mongodb://localhost:27017/express-mongo-api',
    {}
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
