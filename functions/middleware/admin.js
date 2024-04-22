module.exports = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).send({
      message: 'Access denied.',
    });
  }
  next();
};
