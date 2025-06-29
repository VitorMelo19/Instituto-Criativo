-- Criar banco de dados
CREATE DATABASE instituto_criativo_db;
USE instituto_criativo_db;

-- Tabela de usuários (clientes e admins)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100),
  cpf_cnpj VARCHAR(20),
  telefone VARCHAR(20),
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  endereco_numero VARCHAR(200),
  cep VARCHAR(10),
  imagem VARCHAR(255),
  role ENUM('cliente', 'admin') DEFAULT 'cliente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de eventos
CREATE TABLE eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  tipo ENUM('Atividade', 'Curso', 'Workshop', 'Palestra') NOT NULL,
  data_evento DATE NOT NULL,
  horario_evento VARCHAR(10) NOT NULL, -- formato: "19H30"
  local VARCHAR(200) NOT NULL,
  status ENUM('Não iniciado', 'Em andamento', 'Concluído') DEFAULT 'Não iniciado',
  arrecadacao DECIMAL(10,2),
  criado_por INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (criado_por) REFERENCES users(id)
);

-- Tabela de palestrantes dos eventos
CREATE TABLE evento_palestrantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  evento_id INT NOT NULL,
  nome_palestrante VARCHAR(150) NOT NULL,
  FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
);

-- Tabela de participantes dos eventos
CREATE TABLE evento_participantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  evento_id INT NOT NULL,
  nome_participante VARCHAR(150) NOT NULL,
  FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE
);

-- Tabela de projetos
CREATE TABLE projetos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  status ENUM('Não iniciado', 'Em andamento', 'Concluído') DEFAULT 'Não iniciado',
  arrecadacao DECIMAL(10,2),
  criado_por INT NOT NULL,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (criado_por) REFERENCES users(id)
);

-- Tabela de colaboradores dos projetos
CREATE TABLE projeto_colaboradores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projeto_id INT NOT NULL,
  nome_colaborador VARCHAR(150) NOT NULL,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id) ON DELETE CASCADE
);
