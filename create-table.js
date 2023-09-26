import pg from 'pg';

const client = new pg.Client({
host:'127.0.0.1',
user:'postgres',
database:'node_videos',
password:'S3cr3tus',
port:5433,
});



const newTable = async () => {
const drop = `DROP TABLE IF EXISTS videos`
const query = `CREATE TABLE videos(
id     varchar primary key,
title       varchar,
year        varchar,
description varchar,
genre       varchar,
director    varchar
);`;
await client.connect();  // creates connection
try {
await client.query(drop);  // sends query
await client.query(query);  // sends query
} finally {
await client.end();  // closes connection
}
};

newTable()
.then(() => console.table('New table created!'))
.catch(error => console.error(error.stack));