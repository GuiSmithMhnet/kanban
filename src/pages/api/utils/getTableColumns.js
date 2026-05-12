import db from '../config/connectDB.js';

const getTableColumns = async (tableName) => {

    const sql = `
        SELECT
            it.column_name,
            it.column_default,
            it.is_nullable,
            it.data_type,
            it.character_maximum_length
        FROM information_schema.columns it
        WHERE it.table_schema = 'public' AND it.table_catalog = $1 AND table_name = $2
    `;

    const result = await db.query({ text: sql, values: [process.env.POSTGRES_DB, tableName]});

    return result?.rows;
};

export default getTableColumns;