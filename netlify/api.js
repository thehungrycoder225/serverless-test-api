import express from express;
import serverless from serverless-http;

const api = express();
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    hello: 'world',
  });
}

api.use('/api/', router);

export const handler = serverless(api);