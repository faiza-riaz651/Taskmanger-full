export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: "You are unauthenticated!" });
  }
};

export const isAuthorized = (req, res, next) => {
  if (req.user._id === req.params.id) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: "Forbidden" });
  }
};
