const db = require("../config/db");

const isAdmin = (req, res, next) => {
  const user_id = req.user.id;

  const sql = "SELECT role FROM users WHERE id = ?";
  db.query(sql, [user_id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(403).json({ erro: "Acesso negado." });
    }

    if (result[0].role !== "admin") {
      return res.status(403).json({ erro: "Acesso restrito a administradores." });
    }

    next();
  });
};

module.exports = isAdmin;
