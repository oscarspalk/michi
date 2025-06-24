import postgres from 'postgres'

const sql = postgres({ 
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'polak'
 }) // will use psql environment variables

export default sql