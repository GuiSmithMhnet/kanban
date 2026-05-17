CREATE OR REPLACE FUNCTION public.bloquear_alteracao_permissoes_proprietario_espaco()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
	id_proprietario INT;
	exception_text VARCHAR := 'Não é permitido alterar permissões do proprietário do espaço!';
BEGIN

	SELECT espaco.id_usuario
	INTO id_proprietario
	FROM espaco
	WHERE espaco.id = OLD.id_espaco;

	IF TG_OP = 'UPDATE' THEN
		IF OLD.id_usuario = id_proprietario OR NEW.id_usuario = id_proprietario THEN
			RAISE EXCEPTION '%', exception_text;
		END IF;
		
		RETURN NEW;
	END IF;
 
    IF TG_OP = 'DELETE' THEN
		IF OLD.id_usuario = id_proprietario THEN
			RAISE EXCEPTION '%', exception_text;
		END IF;
		
		RETURN OLD;
    END IF;

	RETURN NEW;
END;
$function$
;
