const userRoleMiddleware = (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    if (req.user.role !== 'colegio') {
      return res.sendStatus(403);
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = userRoleMiddleware;