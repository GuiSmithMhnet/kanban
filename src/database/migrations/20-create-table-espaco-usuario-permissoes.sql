CREATE TABLE espaco_usuario_permissoes (
    id SERIAL PRIMARY KEY,
    id_permissao INT NOT NULL REFERENCES espaco_permissoes(id),
    id_usuario INT NOT NULL REFERENCES usuario(id),
    id_espaco INT NOT NULL REFERENCES espaco(id),
    escrita BOOLEAN DEFAULT FALSE,
    data_cadastro TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);