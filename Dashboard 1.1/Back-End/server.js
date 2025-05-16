const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Conexão com o banco
const db = require('./config/db');

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const userRoutes = require('./routes/users');
const eventoRoutes = require('./routes/eventos');
const projetoRoutes = require('./routes/projetos');

app.use('/api/users', userRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/projetos', projetoRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
