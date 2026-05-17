import db from '@/pages/api/config/connectDB';
import defaultResponse from '@/pages/api/config/defaultResponse';
import authMiddleware from '@/pages/api/config/middlewares/authMiddleware';
import userBelongsToSpace from '@/pages/api/utils/userBelongsToSpace';

const handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json(defaultResponse('Método não permitido'));
    }

    try {
        const requiredData = ['id_espaco','id_usuario'];
        const data = req.query ?? {};

        // Verificando dados faltantes ou inválidos
        for(const requiredKey of requiredData){
            if(!data.hasOwnProperty(requiredKey)){
                return res.status(400).json(defaultResponse('Informe espaço e usuário!'));
            }

            if(!Number.isInteger(Number(data[requiredKey]))){
                return res.status(400).json(defaultResponse(`${requiredKey} '${data[requiredKey]}' inválido!`));    
            }

            data[requiredKey] = Number(data[requiredKey]);
        }

        const currentUserBelongsToSpace = await userBelongsToSpace(data.id_espaco, req.user.id);
        if(currentUserBelongsToSpace.belongs === false){
            if(currentUserBelongsToSpace.error === true){
                return res.status(500).json(defaultResponse('Erro ao checar pertencimento de usuário ao espaço. Contate o suporte!'));    
            }
            return res.status(404).json(defaultResponse('Espaço não encontrado!'));
        }

        // Verificando pertencimento do usuário ao espaço
        const belongsToSpace = await userBelongsToSpace(data.id_espaco, data.id_usuario);
        if(belongsToSpace.belongs === false){
            if(belongsToSpace.error === true){
                return res.status(500).json(defaultResponse('Erro ao checar pertencimento de usuário ao espaço. Contate o suporte!'));    
            }
            return res.status(404).json(defaultResponse('Permissões não encontradas!'));
        }

        // Permissões existentes no sistema
        const permissionsResult = await db.query('SELECT id, nome, descricao FROM espaco_permissoes');
        if(permissionsResult.rowCount === 0){
            return res.status(500).json(defaultResponse('Nenhuma permissão encontrada. Contate o suporte'));
        }

        // Permissões do usuário no espaço
        const userPermissionsResult = await db.query({
            text: `
                SELECT id_permissao, escrita
                FROM espaco_usuario_permissoes eup
                WHERE eup.id_usuario = $1 AND eup.id_espaco = $2
            `,
            values: [data.id_usuario, data.id_espaco]
        });
        const userPermissions = userPermissionsResult.rows;

        const permissions = permissionsResult.rows.map(permission => {
            const userPermission = userPermissions.find(p => p.id_permissao == permission.id);

            return { ...permission, escrita: userPermission?.escrita ?? null };
        });

        return res.status(200).json(defaultResponse('Segue permissões', permissions));

    } catch (error) {
        console.log(error);
        return res.status(500).json(defaultResponse('Erro ao listar permissões de usuário'));
    }
};

export default authMiddleware(handler);