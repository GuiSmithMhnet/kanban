CREATE TABLE espaco_permissoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    descricao TEXT,
    data_cadastro TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO espaco_permissoes (nome, descricao) VALUES
    ('ESPACO','Dados cadastrais do espaço'),
    ('QUADRO','Tarefas do espaço'),
    ('USUARIOS','Usuários do espaço');