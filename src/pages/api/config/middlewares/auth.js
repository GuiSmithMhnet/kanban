import jwt from 'jsonwebtoken';
import db from '../connectDB';
import defaultResponse from '../defaultResponse';

const authMiddleware = handler => async (req, res) => {
    try {
        const token = req.headers.authorization;

        const tokenData = jwt.verify(token, process.env.JWT_SECRET);

        const userResult = db.query({
            text: "SELECT id, nome, avatar_public_url, email, senha, data_cadastro, ativo FROM usuario WHERE id = $1",
            values: [tokenData.user.id]
        });

        if (!userResult || userResult.rows.length === 0){
            return res.status(401).json(defaultResponse('Usuário não encontrado!'));
        }

        const user = userResult.rows[0];

        if(user?.ativo !== true){
            return res.status(401).json(defaultResponse('Usuário inativo!'));
        }

        req.user = user;

        return handler(req, res);

    } catch (error) {
        console.log('Erro ao autenticar rota', error);
        return res.status(500).json(defaultResponse('Erro ao autenticar rota. Contate o suporte!'));
    }
}

export default authMiddleware;
