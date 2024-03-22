const userProfessionalMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    if (req.user.role !== 'profesional') {
      return res.sendStatus(403);
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = userProfessionalMiddleware;