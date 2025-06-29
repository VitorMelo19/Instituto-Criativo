const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const passport = require("../utils/googleAuth");
const verifyToken = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  register,
  login,
  getProfile,
  updateProfile,
  updatePhoto
} = require("../controllers/authController");

// Teste de rota
router.get("/teste", (req, res) => {
  res.send("Rota de autenticação funcionando!");
});

// Cadastro e login tradicional
router.post("/register", register);
router.post("/login", login);

// Perfil protegido
router.get("/perfil", verifyToken, getProfile);
router.put("/perfil", verifyToken, updateProfile);
router.put("/perfil/foto", verifyToken, upload.single("foto"), updatePhoto);

// OAuth Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const base = process.env.FRONTEND_URL || "http://localhost:5500";
    const path =
      req.user.role === "admin"
        ? "/Front-End/Dashboard-Admin/home-admin.html"
        : "/Front-End/Dashboard-Cliente/home-cliente.html";

    res.redirect(`${base}${path}?token=${token}`);
  }
);

module.exports = router;
