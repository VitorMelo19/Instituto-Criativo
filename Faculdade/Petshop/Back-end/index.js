// index.js
const express       = require("express");
const cors          = require("cors");
const dotenv        = require("dotenv");
const path          = require("path");
const session       = require("express-session");
const passport      = require("./utils/googleAuth");

// Conexão com o banco de dados
const db = require("./config/db");

// Rotas
const authRoutes        = require("./routes/authRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const petRoutes         = require("./routes/petRoutes");
const servicoRoutes     = require("./routes/servicoRoutes");
const adminRoutes       = require("./routes/adminRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Servir uploads e rotas da API
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/agendamentos", agendamentoRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/servicos", servicoRoutes);
app.use("/api/admin", adminRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do Petshop está rodando! 🐾");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
