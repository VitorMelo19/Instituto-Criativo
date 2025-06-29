// backend/models/Pet.js
const db = require("../config/db");

const cadastrarPet = (user_id, nome, idade, raca, nascimento, genero, imagem, callback) => {
  const sql = "INSERT INTO pets (user_id, nome, idade, raca, nascimento, genero, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [user_id, nome, idade, raca, nascimento, genero, imagem], callback);
};

const listarPetsPorUsuario = (user_id, callback) => {
  const sql = "SELECT * FROM pets WHERE user_id = ?";
  db.query(sql, [user_id], callback);
};

module.exports = {
  cadastrarPet,
  listarPetsPorUsuario
};
