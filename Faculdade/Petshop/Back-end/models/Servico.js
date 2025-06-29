const db = require("../config/db");

const cadastrarServico = (nome, descricao, preco, callback) => {
  const sql = "INSERT INTO servicos (nome, descricao, preco) VALUES (?, ?, ?)";
  db.query(sql, [nome, descricao, preco], callback);
};

const listarServicos = (callback) => {
  const sql = "SELECT * FROM servicos ORDER BY nome ASC";
  db.query(sql, callback);
};

module.exports = {
  cadastrarServico,
  listarServicos
};
