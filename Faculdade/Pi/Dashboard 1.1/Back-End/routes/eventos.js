const express = require('express');
const router = express.Router();

// Por enquanto só uma rota de teste
router.get('/', (req, res) => {
  res.send('Rota de eventos funcionando!');
});

module.exports = router;
