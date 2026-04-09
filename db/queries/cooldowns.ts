import type { QueryResult } from 'pg';
import pool from '../pool.js'

/**
 * Set command's cooldown in second
 * @param user_id 
 * @param commands 
 * @param cooldown 
 * @returns QueryResult
 */

export async function setCooldown( user_id : string,  commands : string,  cooldown : number ){
        try{
            const result :QueryResult= await pool.query(`
            INSERT INTO cooldowns (user_id, command, expires_at) 
            VALUES ($1, $2, NOW() + CAST($3 || ' seconds' AS INTERVAL)) 
            ON CONFLICT (user_id, command)
            DO 
                UPDATE SET expires_at = EXCLUDED.expires_at;`,
            [user_id, commands, cooldown]);

            return result;

        }catch(e){
            console.log(`Error on setCooldown method, reason for ${e}`);
        }
}

/**
 * Checks if a command is on cooldown. 
 * if command or user_id is not found, it returns true.
 * @param user_id 
 * @param command 
 * @returns boolean
 */

export async function checkCooldown(user_id : string, command : string){
    try{

        const result : QueryResult = await pool.query(`
            SELECT expires_at 
            FROM cooldowns 
            WHERE 
                user_id = $1 AND command = $2`, 
            [user_id, command]);
        
        if(!result.rows[0]){
            return  true
        }

        const rows  = result.rows[0];
        const expiredDate = new Date(rows.expires_at)
        const currentDate = new Date(); 
        return currentDate > expiredDate; 

    }catch(e){
        console.log(`Error on checkCooldown method, reason for ${e}`);
    }
}