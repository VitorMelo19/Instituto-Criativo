// backend/models/User.js
const db = require("../config/db");

const createUser = (nome, email, senha, imagem, callback) => {
  const sql = "INSERT INTO users (nome, email, senha, imagem) VALUES (?, ?, ?, ?)";
  db.query(sql, [nome, email, senha, imagem], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

module.exports = {
  createUser,
  findUserByEmail
};
