const express = require("express");
const router = express.Router();
const { cadastrarServico, listarServicos } = require("../controllers/servicoController");
const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

// ✅ Apenas ADMIN pode cadastrar serviço
router.post("/", verifyToken, isAdmin, cadastrarServico);

// ✅ Qualquer usuário pode listar serviços
router.get("/", listarServicos);
const { listarServicosRecentesDoCliente } = require("../controllers/servicoController");

router.get("/recentes", verifyToken, listarServicosRecentesDoCliente);


module.exports = router;
