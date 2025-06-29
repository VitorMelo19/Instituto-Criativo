// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido." });
  }

  const tokenLimpo = token.replace("Bearer ", "");

  jwt.verify(tokenLimpo, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido ou expirado." });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
