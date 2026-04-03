import { Pool} from 'pg'; 
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
    connectionString : process.env.DB_URL
})

const result = await pool.query('SELECT * FROM sections');
console.log(result.rows);