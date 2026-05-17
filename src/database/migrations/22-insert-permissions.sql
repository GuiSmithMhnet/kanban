-- 1. Inserir permissões de proprietários nos espaços
INSERT INTO espaco_usuario_permissoes (id_permissao, id_usuario, id_espaco, escrita)
SELECT
	ep.id AS id_permissao,
	e.id_usuario,
	e.id AS id_espaco,
	TRUE AS escrita
FROM espaco_permissoes ep
CROSS JOIN espaco e
WHERE NOT EXISTS (
	SELECT 1
	FROM espaco_usuario_permissoes AS eup2
	WHERE eup2.id_permissao = ep.id AND eup2.id_usuario = e.id_usuario AND eup2.id_espaco = e.id
);

-- 2. Trigger para criar permissões automaticamente no futuro
CREATE OR REPLACE FUNCTION inserir_permissoes_proprietario_espaco()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO espaco_usuario_permissoes (
        id_permissao,
        id_usuario,
        id_espaco,
        escrita
    )
    SELECT
        ep.id AS id_permissao,
        NEW.id_usuario,
        NEW.id AS id_espaco,
        TRUE AS escrita
    FROM espaco_permissoes ep;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Criando Trigger
DROP TRIGGER IF EXISTS trigger_inserir_permissoes_proprietario_espaco ON espaco;

CREATE TRIGGER trigger_inserir_permissoes_proprietario_espaco
AFTER INSERT ON espaco
FOR EACH ROW
EXECUTE FUNCTION inserir_permissoes_proprietario_espaco();

-- 4. Trigger para impedir alteraão de permissões do proprietário
CREATE OR REPLACE FUNCTION bloquear_alteracao_permissoes_proprietario_espaco()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' OR TG_OP = 'DELETE' THEN
		RAISE EXCEPTION 'Não é permitido alterar permissões do proprietário do espaço';        
		RETURN OLD;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_bloquear_alteracao_permissoes_proprietario_espaco
BEFORE UPDATE OR DELETE ON espaco_usuario_permissoes
FOR EACH ROW
EXECUTE FUNCTION bloquear_alteracao_permissoes_proprietario_espaco();