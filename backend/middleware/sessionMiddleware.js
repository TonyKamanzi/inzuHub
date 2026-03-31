// sessionMiddleware.js
export const isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Please login first" });
  }
  next();
};

export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.session.user.role)) {
      return res
        .status(403)
        .json({ message: "Access forbidden: insufficient role" });
    }
    next();
  };
