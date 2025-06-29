const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  cadastrarPet,
  listarPets,
  editarPet,
  atualizarFotoPet,
  excluirFotoPet
} = require("../controllers/petController");
const verifyToken = require("../middleware/authMiddleware");
const db = require("../config/db");

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Cadastro de pet (com todos os novos campos)
router.post("/", verifyToken, upload.single("imagem"), cadastrarPet);

// Listar pets do usuário logado
router.get("/", verifyToken, listarPets);

// 🔹 NOVA ROTA: Listar pets de qualquer cliente (por ID) - usado no agendamento
router.get("/:clienteId", verifyToken, (req, res) => {
  const clienteId = req.params.clienteId;

  const sql = "SELECT * FROM pets WHERE user_id = ?";
  db.query(sql, [clienteId], (err, result) => {
    if (err) {
      console.error("Erro ao buscar pets:", err);
      return res.status(500).json({ erro: "Erro ao buscar pets do cliente." });
    }
    res.status(200).json(result);
  });
});


// Editar dados do pet
router.put("/:id", verifyToken, editarPet);

// Atualizar imagem do pet
router.put("/foto/:id", verifyToken, upload.single("imagem"), atualizarFotoPet);

// Excluir imagem do pet
router.delete("/foto/:id", verifyToken, excluirFotoPet);


module.exports = router;
