import pg from 'pg';

const { Pool } = pg;

const globalForPg = globalThis;

const db =
    globalForPg.pgPool ??
    new Pool({
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPg.pgPool = db;
}

export default db;