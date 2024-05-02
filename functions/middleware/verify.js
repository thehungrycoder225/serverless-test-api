const crypto = require('crypto');
const generateKey = require('./generateKey');

module.exports = async (req, res, next) => {
  const verify = crypto.createVerify('SHA256');
  const data = req.body;
  const publicKey = generateKey();
  verify.update(data);
  verify.end();

  const isValid = verify.verify(publicKey, req.body.signature, 'base64');
  if (isValid) {
    res.send({
      message: 'The signature is valid',
    });
  } else {
    res.send({
      message: 'The signature is invalid',
    });
  }
};
