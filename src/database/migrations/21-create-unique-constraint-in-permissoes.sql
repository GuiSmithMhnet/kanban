ALTER TABLE espaco_usuario_permissoes
ADD CONSTRAINT unique_usuario_espaco_permissao
UNIQUE (id_usuario, id_espaco, id_permissao);