// backend/models/AgendamentoServico.js
const db = require("../config/db");

const vincularServicos = (agendamento_id, servicos, callback) => {
  if (!Array.isArray(servicos) || servicos.length === 0) {
    return callback(null); // nada a vincular
  }

  const values = servicos.map(servico_id => [agendamento_id, servico_id]);

  const sql = "INSERT INTO agendamento_servicos (agendamento_id, servico_id) VALUES ?";
  db.query(sql, [values], callback);
};

const listarServicosDoAgendamento = (agendamento_id, callback) => {
  const sql = `
    SELECT s.id, s.nome, s.descricao, s.preco
    FROM servicos s
    JOIN agendamento_servicos ags ON ags.servico_id = s.id
    WHERE ags.agendamento_id = ?
  `;
  db.query(sql, [agendamento_id], callback);
};

module.exports = {
  vincularServicos,
  listarServicosDoAgendamento
};
