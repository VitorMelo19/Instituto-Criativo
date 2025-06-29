-- Arrumar esse arquivo

USE petshop_db;

SELECT * FROM users;

select * from pets;
SELECT * FROM agendamentos;
SELECT * FROM servicos;

DROP DATABASE IF EXISTS petshop_db;



-- Troque pelo email do usuário que será administrador
-- UPDATE users
-- SET role = 'admin'
-- WHERE email = 'admin@email.com';

-- Verificar se funcionou
SELECT id, nome, email, role FROM users;

-- COMO RECRIAR UM USUÁRIO MANUALMENTE DIRETO NO MYSQL
-- INSERT INTO users (nome, email, senha, role)
-- VALUES ('Admin Master', 'admin@email.com', 'senha123', 'admin');

-- Excluir usuario no banco, e no espaço "id = 1" colocar o id referente ao user que quer excluir
DELETE FROM users WHERE id = 1;

-- Troque pelo email do usuário que será administrador
UPDATE users
SET role = 'admin'
WHERE email = 'vitormelocursos@gmail.com';