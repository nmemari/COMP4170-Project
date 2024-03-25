import pg from "pg";

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pokemon-party-db',
    password: '', // change this to whatever your server password is that you setup for PgAdmin 4
    port: 5432
});

export default pool;
