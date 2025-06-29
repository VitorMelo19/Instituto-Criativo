// backend/routes/agendamentoRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { criarAgendamento, listarAgendamentos } = require("../controllers/agendamentoController");
const verifyToken = require("../middleware/authMiddleware");

// Teste
router.get("/teste", (req, res) => {
  res.send("Rota de agendamentos funcionando!");
});

// Configuração do Multer (upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Rota para criar agendamento (com imagem)
router.post("/", verifyToken, upload.single("imagem_pet"), criarAgendamento);

// Rota para listar agendamentos do usuário
router.get("/", verifyToken, listarAgendamentos);

module.exports = router;
