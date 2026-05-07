import { Pool } from 'pg';

// Prod
const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    port: 5432,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: false
});

// Dev
// const pool = new Pool({
//     host: 'localhost',
//     user: process.env.POSTGRES_USER,
//     port: 5433,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DB,
//     ssl: false
// });

export default pool;