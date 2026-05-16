import db from '@/pages/api/config/connectDB';
import defaultResponse from '@/pages/api/config/defaultResponse';
import authMiddleware from '@/pages/api/config/middlewares/authMiddleware';
import buildImgSrc from '@/pages/api/utils/buildImgSrc';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json(defaultResponse('Método não permitido'));
  }

  try {
    const idEspaco = Number(req.query?.id_espaco);

    if (!Number.isInteger(idEspaco) || idEspaco <= 0) {
      return res.status(400).json(defaultResponse('ID inválido'));
    }

    const [espacoResult, vinculoResult] = await Promise.all([
      db.query({
        text: `
          SELECT id, id_usuario
          FROM espaco
          WHERE id = $1
        `,
        values: [idEspaco],
      }),
      db.query({
        text: `
          SELECT id
          FROM espaco_usuario
          WHERE id_espaco = $1
            AND id_usuario = $2
            AND ativo = true
          LIMIT 1
        `,
        values: [idEspaco, req.user.id],
      }),
    ]);

    if (espacoResult.rowCount !== 1) {
      return res.status(404).json(defaultResponse('Espaço não encontrado!'));
    }

    const espaco = espacoResult.rows[0];
    const isProprietario = Number(espaco.id_usuario) === Number(req.user.id);

    if (!isProprietario && vinculoResult.rowCount !== 1) {
      return res.status(404).json(defaultResponse('Espaço não encontrado!'));
    }

    const convitesResult = await db.query({
      text: `
        SELECT
          ec.id,
          CASE 
            WHEN ec.data_expiracao < NOW() AND ec.status = 'PENDENTE' THEN 'EXPIRADO'
            ELSE ec.status::TEXT
          END AS status,
          ec.enviar_email,
          ec.data_cadastro,
          ec.data_expiracao,
          ec.data_aceite,
          ec.data_recusa,
          u.nome,
          u.email,
          u.username,
          u.avatar_public_url
        FROM espaco_convite ec
        JOIN usuario u ON u.id = ec.id_usuario
        WHERE ec.id_espaco = $1
        ORDER BY
          CASE
            WHEN ec.status = 'PENDENTE' AND ec.data_expiracao >= NOW() THEN 0
            ELSE 1
          END,
          ec.data_cadastro ASC
      `,
      values: [idEspaco],
    });

    const convites = convitesResult.rows.map(({ avatar_public_url, ...convite }) => ({
      ...convite,
      src: avatar_public_url ? buildImgSrc(avatar_public_url) : null,
    }));

    return res.status(200).json(defaultResponse('Segue convites', convites));
  } catch (error) {
    console.log(error);
    return res.status(500).json(defaultResponse('Erro ao listar convites'));
  }
};

export default authMiddleware(handler);
