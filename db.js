import pg from "pg";

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pokemon-party-db',
    password: 'Zeon1357',
    port: 5432
});

export default pool;
