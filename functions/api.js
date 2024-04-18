import express from 'express';
import serverless from 'serverless-http';

const api = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    hello: 'express',
  });
});

api.use('/.netlify/functions/api', router);

export const handler = serverless(api);
