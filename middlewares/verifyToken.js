const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ error: "Unauthorized" });
    const verified = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.json({ error: "Unauthorized" });
  }
}

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.json({ error: "Unauthorized" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };