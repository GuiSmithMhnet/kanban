CREATE OR REPLACE FUNCTION public.inserir_permissoes_participantes_espaco()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO espaco_usuario_permissoes (id_permissao, id_usuario, id_espaco, escrita)
    SELECT ep.id AS id_permissao, NEW.id_usuario, NEW.id_espaco, false AS escrita
    FROM espaco_permissoes ep;

    RETURN NEW;
END;
$function$
;

DROP TRIGGER IF EXISTS trigger_inserir_permissoes_participantes_espaco ON espaco_usuario;

CREATE TRIGGER trigger_inserir_permissoes_participantes_espaco
AFTER INSERT ON espaco_usuario
FOR EACH ROW
EXECUTE FUNCTION inserir_permissoes_participantes_espaco();