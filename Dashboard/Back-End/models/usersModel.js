const db = require('../config/db');

exports.getAll = (callback) => {
  db.query('SELECT * FROM users', callback);
};

exports.getById = (id, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
  const query = `
    INSERT INTO users (nome, sobrenome, cpf_cnpj, telefone, email, senha, endereco_numero, cep, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.nome, data.sobrenome, data.cpf_cnpj, data.telefone, data.email,
    data.senha, data.endereco_numero, data.cep, data.role || 'cliente'
  ];
  db.query(query, values, callback);
};

exports.update = (id, data, callback) => {
  const query = `
    UPDATE users SET nome=?, sobrenome=?, cpf_cnpj=?, telefone=?, email=?, senha=?, endereco_numero=?, cep=?, role=?
    WHERE id=?
  `;
  const values = [
    data.nome, data.sobrenome, data.cpf_cnpj, data.telefone, data.email,
    data.senha, data.endereco_numero, data.cep, data.role || 'cliente', id
  ];
  db.query(query, values, callback);
};

exports.delete = (id, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [id], callback);
};
