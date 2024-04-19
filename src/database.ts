import { createPool } from 'mysql2/promise';
import { Pool } from 'mysql2/typings/mysql/lib/Pool';
import mysql from 'mysql2/promise';

// const dotenv = require('dotenv');
// dotenv.config();
//import ENV from '../env';


export async function connect()  {
    console.log("ENV file: " + process.env.PORT);
    const pool : mysql.Pool= mysql.createPool({
        host: 'localhost',
        user: process.env.DB_USERNAME || "***",
        password: process.env.DB_PASSWORD || "***",
        database: process.env.DATABASE || 'tudolist',
        connectionLimit: 10
    });
    const connection : any= await pool.getConnection();
    return connection;
}