import db from '@/pages/api/config/connectDB';

import defaultResponse from '@/pages/api/config/defaultResponse';

const handler = async (req, res) => {
    try {
        const sql = "SELECT * FROM tarefa ORDER BY id ASC";
        const tarefas = await db.query(sql);

        return res.status(200).json(defaultResponse('Segue tarefas', tarefas.rows));
    } catch (error) {
        console.log(error);
        return res.status(500).json(defaultResponse());
    }
};

export default handler;