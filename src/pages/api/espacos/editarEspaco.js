import db from '@/pages/api/config/connectDB';
import defaultResponse from '@/pages/api/config/defaultResponse';
import authMiddleware from '@/pages/api/config/middlewares/authMiddleware';
import getTableColumns from '@/pages/api/utils/getTableColumns';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json(defaultResponse('Método não permitido'));
  }

  try {
    const tableName = 'espaco';
    const user = req.user;
    const dadosForm = req.body ?? {};
    const requiredData = {
      id: 'ID',
      nome: 'Nome',
      descricao: 'Descrição',
      sigla: 'Sigla',
      icon: 'Ícone',
      ativo: 'Ativo',
    };
    const data = {};
    const { id, nome, descricao, sigla, icon, ativo } = dadosForm;

    for (const requiredKey in requiredData) {
      if (dadosForm[requiredKey] === undefined || dadosForm[requiredKey] === null || dadosForm[requiredKey] === '') {
        console.log('chave faltante: ', requiredKey);
        return res.status(400).json(defaultResponse('Preencha todos os dados para continuar'));
      }

      data[requiredKey] = dadosForm[requiredKey];
    }

    if (!Number.isInteger(Number(id))) {
      return res.status(400).json(defaultResponse('ID inválido'));
    }

    if (typeof ativo !== 'boolean') {
      return res.status(400).json(defaultResponse('Ativo deve ser verdadeiro ou falso'));
    }

    const dbColumns = await getTableColumns(tableName);
    const maxLengthFields = ['nome', 'descricao', 'sigla', 'icon'];

    for (const key of maxLengthFields) {
      const column = dbColumns.find((col) => col.column_name === key);
      const maxLength = column?.character_maximum_length;

      if (maxLength && String(data[key]).length > maxLength) {
        return res.status(400).json(defaultResponse(`${requiredData[key]} deve ter no máximo ${maxLength} caracteres`));
      }
    }

    const espacoExistente = await db.query({
      text: `
        SELECT id
        FROM espaco
        WHERE id = $1 AND id_usuario = $2
      `,
      values: [id, user.id],
    });

    if (espacoExistente.rowCount !== 1) {
      return res.status(404).json(defaultResponse('Espaço não encontrado!'));
    }

    const sql = `
      UPDATE espaco
      SET nome = $1,
        descricao = $2,
        sigla = $3,
        icon = $4,
        ativo = $5
      WHERE id = $6 AND id_usuario = $7
      RETURNING *
    `;

    const espaco = await db.query({ text: sql, values: [nome, descricao, sigla, icon, ativo, id, user.id] });

    if (espaco.rowCount === 0) {
      return res.status(404).json(defaultResponse('Espaço não encontrado!'));
    }

    return res.status(200).json(defaultResponse('Espaço atualizado com sucesso', espaco.rows[0]));
  } catch (error) {
    console.log(error);
    return res.status(500).json(defaultResponse('Erro ao editar espaço'));
  }
};

export default authMiddleware(handler);
