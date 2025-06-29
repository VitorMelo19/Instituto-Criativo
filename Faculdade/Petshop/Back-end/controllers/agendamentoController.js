// backend/controllers/agendamentoController.js
const path = require("path");
const fs = require("fs");
const Agendamento = require("../models/Agendamento");
const AgendamentoServico = require("../models/AgendamentoServico");
const db = require("../config/db");

const criarAgendamento = (req, res) => {
  const user_id = Number(req.body.clienteId); // força ser número e ignora req.user
  const {
    id_pet,
    nome_pet,
    raca,
    data_agendamento,
    horario,
    servicos,
    observacoes
  } = req.body;

  const servicosArray = typeof servicos === "string" ? JSON.parse(servicos) : servicos;

  Agendamento.verificarHorario(data_agendamento, horario, (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao verificar horário." });

    if (results.length > 0) {
      return res.status(409).json({ erro: "Horário já está ocupado." });
    }

    const salvarAgendamento = (dadosAgendamento) => {
      Agendamento.criarAgendamento(dadosAgendamento, (err, result) => {
        if (err) return res.status(500).json({ erro: "Erro ao salvar agendamento." });

        const agendamento_id = result.insertId;

        AgendamentoServico.vincularServicos(agendamento_id, servicosArray, (err) => {
          if (err) return res.status(500).json({ erro: "Erro ao vincular serviços." });

          res.status(201).json({ mensagem: "Agendamento realizado com sucesso!" });
        });
      });
    };

    if (id_pet) {
      const sql = "SELECT nome, raca, imagem FROM pets WHERE id = ? AND user_id = ?";
      db.query("SELECT nome, raca, imagem FROM pets WHERE id = ?", [id_pet], (err, result) => {
        
        if (err) return res.status(500).json({ erro: "Erro ao buscar pet." });
        if (result.length === 0) return res.status(404).json({ erro: "Pet não encontrado." });

        const pet = result[0];

        salvarAgendamento({
          user_id,
          nome_pet: pet.nome,
          raca: pet.raca,
          data_agendamento,
          horario,
          servicos: "", // ignorado pois os serviços são vinculados na tabela própria
          observacoes,
          imagem_pet: pet.imagem
        });
      });

    } else {
      const imagem_pet = req.file ? req.file.filename : null;

      salvarAgendamento({
        user_id,
        nome_pet,
        raca,
        data_agendamento,
        horario,
        servicos: "",
        observacoes,
        imagem_pet
      });
    }
  });
};

const listarAgendamentos = (req, res) => {
  const user_id = req.user?.id || req.body.clienteId;

  Agendamento.listarPorUsuario(user_id, async (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar agendamentos." });

    // Buscar os serviços vinculados a cada agendamento
    const agendamentosComServicos = await Promise.all(
      results.map(async (agendamento) => {
        return new Promise((resolve) => {
          AgendamentoServico.listarServicosDoAgendamento(agendamento.id, (err, servicos) => {
            resolve({
              ...agendamento,
              servicos: servicos || []
            });
          });
        });
      })
    );

    res.status(200).json(agendamentosComServicos);
  });
};

module.exports = {
  criarAgendamento,
  listarAgendamentos
};
