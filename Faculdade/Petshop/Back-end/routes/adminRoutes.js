const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const db = require("../config/db");
const { criarAgendamento } = require("../controllers/agendamentoController");

// 🔹 Listar todos os serviços
router.get("/servicos", verifyToken, isAdmin, (req, res) => {
  const sql = "SELECT * FROM servicos ORDER BY nome ASC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar serviços." });
    res.status(200).json(results);
  });
});

// 🔹 Cadastrar novo serviço
router.post("/servicos", verifyToken, isAdmin, (req, res) => {
  const { nome, descricao, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ erro: "Nome e preço são obrigatórios." });
  }

  const sql = "INSERT INTO servicos (nome, descricao, preco) VALUES (?, ?, ?)";
  db.query(sql, [nome, descricao, preco], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao cadastrar serviço." });
    res.status(201).json({ mensagem: "Serviço cadastrado com sucesso!" });
  });
});

// 🔹 Editar um serviço
router.put("/servicos/:id", verifyToken, isAdmin, (req, res) => {
  const { nome, descricao, preco } = req.body;
  const id = req.params.id;

  const sql = "UPDATE servicos SET nome = ?, descricao = ?, preco = ? WHERE id = ?";
  db.query(sql, [nome, descricao, preco, id], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao atualizar serviço." });
    res.status(200).json({ mensagem: "Serviço atualizado com sucesso!" });
  });
});

// 🔹 Excluir um serviço
router.delete("/servicos/:id", verifyToken, isAdmin, (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM servicos WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ erro: "Erro ao excluir serviço." });
    res.status(200).json({ mensagem: "Serviço excluído com sucesso!" });
  });
});

// 🔹 Serviços mais usados (para gráfico)
router.get("/servicos-mais-usados", verifyToken, isAdmin, (req, res) => {
  const sql = `
    SELECT s.nome, COUNT(*) AS total
    FROM agendamento_servicos ags
    JOIN servicos s ON s.id = ags.servico_id
    GROUP BY s.nome
    ORDER BY total DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao gerar estatísticas." });
    res.status(200).json(results);
  });
});

// 🔹 Buscar clientes (para agendamento)
router.get("/clientes", verifyToken, isAdmin, (req, res) => {
  const busca = req.query.buscar;
  if (!busca) {
    return res.status(400).json({ erro: "Informe um valor de busca." });
  }

  const sql = `
    SELECT id, nome, sobrenome, email, cpf_cnpj, telefone, imagem
    FROM users
    WHERE role = 'cliente' AND (
      nome LIKE ? OR
      sobrenome LIKE ? OR
      email LIKE ? OR
      cpf_cnpj LIKE ? OR
      telefone LIKE ?
    )
  `;
  const valor = `%${busca}%`;
  db.query(sql, [valor, valor, valor, valor, valor], (err, results) => {
    if (err) {
      console.error("Erro ao buscar clientes:", err);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
    res.status(200).json(results);
  });
});

// 🔹 Gerar grade de horários disponíveis (removendo horários ocupados)
router.get("/horarios-disponiveis", verifyToken, isAdmin, (req, res) => {
  const dataSelecionada = req.query.data;

  if (!dataSelecionada) {
    return res.status(400).json({ erro: "Data não fornecida." });
  }

  const horarios = [];
  let hora = 9, minuto = 0;

  while (hora < 19 || (hora === 19 && minuto === 0)) {
    const hStr = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
    horarios.push(hStr);
    minuto += 10;
    if (minuto >= 60) {
      minuto = 0;
      hora++;
    }
  }

  const sql = `SELECT horario FROM agendamentos WHERE data_agendamento = ?`;

  db.query(sql, [dataSelecionada], (err, results) => {
    if (err) return res.status(500).json({ erro: "Erro ao buscar horários ocupados." });

    const horariosOcupados = results.map(r => r.horario.slice(0, 5)); // "14:00:00" → "14:00"
    const horariosDisponiveis = horarios.filter(h => !horariosOcupados.includes(h));

    res.status(200).json(horariosDisponiveis);
  });
});

// 🔹 Agendar atendimento (usado no admin.js)
router.post("/agendar", verifyToken, isAdmin, criarAgendamento);

// 🔹 Atualizar cliente (usado na edição no painel admin)
router.put("/clientes/:id", verifyToken, isAdmin, (req, res) => {
  const id = req.params.id;
  const { nome, sobrenome, cpf_cnpj, email, telefone, endereco, cep } = req.body;

  const sql = `
    UPDATE users 
    SET nome = ?, sobrenome = ?, cpf_cnpj = ?, email = ?, telefone = ?, endereco = ?, numero = ?, cep = ?
    WHERE id = ? AND role = 'cliente'
  `;

  db.query(sql, [nome, sobrenome, cpf_cnpj, email, telefone, endereco, cep, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar cliente:", err);
      return res.status(500).json({ erro: "Erro ao atualizar cliente." });
    }
    res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
  });
});

// 🔹 Listar pets de um cliente (GET /api/pets/:user_id)
router.get("/pets/:user_id", verifyToken, isAdmin, (req, res) => {
  const user_id = req.params.user_id;

  const sql = `
    SELECT id, nome, idade, raca, genero, data_nascimento, imagem 
    FROM pets 
    WHERE user_id = ?
    ORDER BY nome ASC
  `;

  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar pets:", err);
      return res.status(500).json({ erro: "Erro ao buscar pets do cliente." });
    }
    res.status(200).json(results);
  });
});

// 🔹 Cadastrar pet (POST /api/pets)
router.post("/pets", verifyToken, isAdmin, (req, res) => {
  const { user_id, nome, idade, raca, nascimento, genero } = req.body;

  if (!user_id || !nome || !idade || !raca || !nascimento || !genero) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
  }

  const sql = `
    INSERT INTO pets (user_id, nome, idade, raca, nascimento, genero)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [user_id, nome, idade, raca, nascimento, genero], (err, result) => {
    if (err) {
      console.error("Erro ao cadastrar pet:", err);
      return res.status(500).json({ erro: "Erro ao cadastrar pet." });
    }
    res.status(201).json({ mensagem: "Pet cadastrado com sucesso!" });
  });
});

// 🔹 Atualizar pet (PUT /api/pets/:id)
router.put("/pets/:id", verifyToken, isAdmin, (req, res) => {
  const id = req.params.id;
  const { nome, idade, raca, nascimento, genero } = req.body;

  const sql = `
    UPDATE pets 
    SET nome = ?, idade = ?, raca = ?, nascimento = ?, genero = ?
    WHERE id = ?
  `;

  db.query(sql, [nome, idade, raca, nascimento, genero, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar pet:", err);
      return res.status(500).json({ erro: "Erro ao atualizar pet." });
    }
    res.status(200).json({ mensagem: "Pet atualizado com sucesso!" });
  });
});


module.exports = router;
