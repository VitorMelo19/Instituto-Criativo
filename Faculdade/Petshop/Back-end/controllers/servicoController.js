const Servico = require("../models/Servico");

const cadastrarServico = (req, res) => {
  const { nome, descricao, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ erro: "Nome e preço são obrigatórios." });
  }

  Servico.cadastrarServico(nome, descricao, preco, (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao cadastrar serviço." });

    res.status(201).json({ mensagem: "Serviço cadastrado com sucesso!" });
  });
};

const listarServicos = (req, res) => {
  Servico.listarServicos((err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao listar serviços." });

    res.status(200).json(results);
  });
};

module.exports = {
  cadastrarServico,
  listarServicos
};

const db = require("../config/db");

const listarServicosRecentesDoCliente = (req, res) => {
  const user_id = req.user.id;

  const sql = `
    SELECT DISTINCT s.id, s.nome, s.descricao, s.preco
    FROM servicos s
    JOIN agendamento_servicos ags ON ags.servico_id = s.id
    JOIN agendamentos a ON a.id = ags.agendamento_id
    WHERE a.user_id = ?
    ORDER BY a.data_agendamento DESC, a.horario DESC
    LIMIT 5
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar serviços recentes:", err);
      return res.status(500).json({ erro: "Erro ao buscar serviços utilizados." });
    }
    res.status(200).json(results);
  });
};

module.exports = {
  cadastrarServico,
  listarServicos,
  listarServicosRecentesDoCliente
};
