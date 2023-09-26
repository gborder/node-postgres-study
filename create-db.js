import pg from 'pg';

const client = new pg.Client({
    host: '127.0.0.1',
    user: 'postgres',
    password: 'S3cr3tus',
    port: 5433,
});

const createDatabase = async () => {
    try {
        await client.connect();                            // gets connection
        await client.query('CREATE DATABASE node_videos'); // sends queries
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    } finally {
        await client.end();                                // closes connection
    }
};

createDatabase().then((result) => {
    if (result) {
        console.log('Database created');
    }
});