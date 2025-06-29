const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const register = (req, res) => {
  const {
    nome,
    sobrenome,
    cpf_cnpj,
    endereco, // já inclui número agora
    cep,
    telefone,
    email,
    senha
  } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "Nome, e-mail e senha são obrigatórios." });
  }

  bcrypt.hash(senha, 10, (err, hash) => {
    if (err) return res.status(500).json({ erro: "Erro ao criptografar senha." });

    const sql = `
      INSERT INTO users (
        nome, sobrenome, cpf_cnpj, endereco, cep, telefone,
        email, senha
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [nome, sobrenome, cpf_cnpj, endereco, cep, telefone, email, hash],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ erro: "Erro ao registrar usuário." });
        }

        res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
      }
    );
  });
};

const login = (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado." });
    }

    const user = results[0];

    bcrypt.compare(senha, user.senha, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ erro: "Senha incorreta." });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        token,
        role: user.role
      });
    });
  });
};

module.exports = { register, login };


const getProfile = (req, res) => {
  const sql = `
    SELECT nome, sobrenome, cpf_cnpj, endereco, cep, email, imagem
    FROM users WHERE id = ?
  `;
  db.query(sql, [req.user.id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }
    res.json(result[0]);
  });
};

// ⬇️ NOVA FUNÇÃO PARA PUT /perfil
const updateProfile = (req, res) => {
  const campos = [];
  const valores = [];

  for (const [chave, valor] of Object.entries(req.body)) {
    campos.push(`${chave} = ?`);
    valores.push(valor);
  }

  if (campos.length === 0) {
    return res.status(400).json({ erro: "Nenhum dado enviado." });
  }

  valores.push(req.user.id);
  const sql = `UPDATE users SET ${campos.join(", ")} WHERE id = ?`;

  db.query(sql, valores, (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao atualizar perfil." });
    res.json({ mensagem: "Perfil atualizado com sucesso!" });
  });
};

// ⬇️ NOVA FUNÇÃO PARA PUT /perfil/foto
const updatePhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: "Nenhuma imagem enviada." });
  }

  const imagemPath = req.file.path; // ex: "uploads/abc123.png"
  const sql = `UPDATE users SET imagem = ? WHERE id = ?`;

  db.query(sql, [imagemPath, req.user.id], (err) => {
    if (err) return res.status(500).json({ erro: "Erro ao salvar imagem." });
    res.json({ mensagem: "Foto atualizada com sucesso!", imagem: imagemPath });
  });
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  updatePhoto
};

