const userModel = require('../models/usersModel');

exports.getAllUsers = (req, res) => {
  userModel.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  userModel.getById(id, (err, user) => {
    if (err) return res.status(500).json({ error: err });
    res.json(user);
  });
};

exports.createUser = (req, res) => {
  const userData = req.body;
  userModel.create(userData, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, ...userData });
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  userModel.update(id, userData, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuário atualizado com sucesso!' });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  userModel.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuário deletado com sucesso!' });
  });
};
