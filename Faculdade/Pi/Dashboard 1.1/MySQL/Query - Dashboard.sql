-- Exibir todos os eventos (ordenados por data)
SELECT * FROM eventos ORDER BY data_evento ASC;

-- Filtrar eventos por tipo (Curso, Workshop etc.)
SELECT * FROM eventos WHERE tipo = 'Curso'; -- troque por outro tipo conforme necessário

--  Exibir todos os projetos
SELECT * FROM projetos ORDER BY criado_em DESC;

-- Buscar eventos por nome de participante
SELECT e.*
FROM eventos e
JOIN evento_participantes ep ON e.id = ep.evento_id
WHERE ep.nome_participante LIKE '%fulano%';

-- Buscar evento ou projeto por palestrante ou colaborador
-- Buscar eventos por nome do palestrante
SELECT e.*
FROM eventos e
JOIN evento_palestrantes ep ON e.id = ep.evento_id
WHERE ep.nome_palestrante LIKE '%nome%';

-- Buscar projetos por nome do colaborador
SELECT p.*
FROM projetos p
JOIN projeto_colaboradores pc ON p.id = pc.projeto_id
WHERE pc.nome_colaborador LIKE '%nome%';

-- Calcular total das arrecadações (eventos + projetos)
SELECT
  (SELECT IFNULL(SUM(arrecadacao), 0) FROM eventos) AS total_eventos,
  (SELECT IFNULL(SUM(arrecadacao), 0) FROM projetos) AS total_projetos,
  (
    (SELECT IFNULL(SUM(arrecadacao), 0) FROM eventos) +
    (SELECT IFNULL(SUM(arrecadacao), 0) FROM projetos)
  ) AS total_geral;

-- Editar evento ou projeto (exemplo com UPDATE)
-- Evento
UPDATE eventos
SET titulo = 'Novo título',
    status = 'Em andamento',
    local = 'Novo local'
WHERE id = 1;

-- Projeto
UPDATE projetos
SET nome = 'Novo nome',
    status = 'Concluído'
WHERE id = 1;

