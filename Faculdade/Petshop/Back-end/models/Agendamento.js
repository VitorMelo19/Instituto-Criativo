// backend/models/Agendamento.js
const db = require("../config/db");

// Criar novo agendamento
const criarAgendamento = (dados, callback) => {
  const {
    user_id,
    nome_pet,
    raca,
    data_agendamento,
    horario,
    servicos,
    observacoes,
    imagem_pet
  } = dados;

  const sql = `
    INSERT INTO agendamentos (
      user_id, nome_pet, raca, data_agendamento, horario,
      servicos, observacoes, imagem_pet
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      nome_pet,
      raca,
      data_agendamento,
      horario,
      servicos,
      observacoes,
      imagem_pet
    ],
    callback
  );
};

// Verificar se o horário já está ocupado
const verificarHorario = (data, horario, callback) => {
  const sql = `
    SELECT * FROM agendamentos
    WHERE data_agendamento = ? AND horario = ?
  `;
  db.query(sql, [data, horario], callback);
};

// Listar agendamentos por usuário
const listarPorUsuario = (user_id, callback) => {
  const sql = `SELECT * FROM agendamentos WHERE user_id = ? ORDER BY data_agendamento DESC`;
  db.query(sql, [user_id], callback);
};

module.exports = {
  criarAgendamento,
  verificarHorario,
  listarPorUsuario,
};
