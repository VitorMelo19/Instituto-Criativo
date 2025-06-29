const Pet = require("../models/pet");

const cadastrarPet = (req, res) => {
  const user_id = req.user.id;
  const { nome, idade, raca, nascimento, genero } = req.body;
  const imagem = req.file ? req.file.filename : null;

  if (!nome) return res.status(400).json({ erro: "O nome do pet é obrigatório." });

  Pet.cadastrarPet(user_id, nome, idade, raca, nascimento, genero, imagem, (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao cadastrar pet." });

    res.status(201).json({ mensagem: "Pet cadastrado com sucesso!" });
  });
};

const listarPets = (req, res) => {
  const user_id = req.user.id;

  Pet.listarPetsPorUsuario(user_id, (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao listar pets." });

    res.status(200).json(results);
  });
};

const db = require("../config/db");

const editarPet = (req, res) => {
  const petId = req.params.id;
  const user_id = req.user.id;
  const { nome, idade, raca, nascimento, genero } = req.body;

  const sql = `
    UPDATE pets SET nome = ?, idade = ?, raca = ?, nascimento = ?, genero = ?
    WHERE id = ? AND user_id = ?
  `;
  db.query(sql, [nome, idade, raca, nascimento, genero, petId, user_id], (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao editar pet." });
    res.status(200).json({ mensagem: "Pet atualizado com sucesso!" });
  });
};

const atualizarFotoPet = (req, res) => {
  if (!req.file) return res.status(400).json({ erro: "Imagem não enviada." });

  const petId = req.params.id;
  const user_id = req.user.id;
  const sql = `UPDATE pets SET imagem = ? WHERE id = ? AND user_id = ?`;

  db.query(sql, [req.file.filename, petId, user_id], (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao atualizar foto." });
    res.status(200).json({ mensagem: "Foto atualizada com sucesso!" });
  });
};

const excluirFotoPet = (req, res) => {
  const petId = req.params.id;
  const user_id = req.user.id;
  const sql = `UPDATE pets SET imagem = NULL WHERE id = ? AND user_id = ?`;

  db.query(sql, [petId, user_id], (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao excluir foto." });
    res.status(200).json({ mensagem: "Foto excluída." });
  });
};

module.exports = {
  cadastrarPet,
  listarPets,
  editarPet,
  atualizarFotoPet,
  excluirFotoPet
};
