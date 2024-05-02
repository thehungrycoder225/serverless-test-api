const crypto = require('crypto');
const generateKey = require('./generateKey');

module.exports = async (req, res, next) => {
  const privateKey = await generateKey().privateKey; // Assuming generateKey is a function that generates a private key
  const message = 'hello world';
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(message);
  const signature = sign.sign(privateKey, 'base64');

  res.send({
    message,
    signature,
  });
};
