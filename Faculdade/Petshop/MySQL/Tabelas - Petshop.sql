CREATE DATABASE petshop_db;
USE petshop_db;

-- Tabela de usuários (clientes e admins)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  sobrenome VARCHAR(100),
  cpf_cnpj VARCHAR(20),
  telefone VARCHAR(20),
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  endereco VARCHAR(200),
  cep VARCHAR(10),
  imagem VARCHAR(255),
  role VARCHAR(20) DEFAULT 'cliente',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de pets
CREATE TABLE pets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  idade INT,
  raca VARCHAR(100),
  nascimento DATE,
  genero VARCHAR(20),
  imagem VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);


-- Tabela de serviços
CREATE TABLE servicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  preco DECIMAL(10,2),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de agendamentos
CREATE TABLE agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  nome_pet VARCHAR(100) NOT NULL,
  raca VARCHAR(100) NOT NULL,
  data_agendamento DATE NOT NULL,
  horario TIME NOT NULL,
  servicos TEXT,
  observacoes TEXT,
  imagem_pet VARCHAR(255),
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Relação agendamento <-> serviços
CREATE TABLE agendamento_servicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  agendamento_id INT NOT NULL,
  servico_id INT NOT NULL,
  FOREIGN KEY (agendamento_id) REFERENCES agendamentos(id) ON DELETE CASCADE,
  FOREIGN KEY (servico_id) REFERENCES servicos(id) ON DELETE CASCADE
);
