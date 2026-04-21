import type { QueryResult } from "pg";
import pool from "../pool.js";

/**
 * register a user to the database
 * @param user_id 
 * @param name 
 * @returns QueryResult
 */
export async function regUser(user_id : string, name : string){
    try{
        const use_query : QueryResult = await pool.query(`INSERT INTO users(username, user_id) VALUES ($1, $2);`, 
            [name, user_id]);
        
        return use_query.rows;
    }catch(e){
        console.log(`Error on regUser function, reason : ${e}`)
    }
}

/**
 * get user in the database
 * @param user_id 
 * @returns QueryResult
 */

export async function getUser(user_id : string) {

    try{
        const results : QueryResult = await pool.query(`SELECT * FROM users WHERE user_id = $1;`, [user_id]);
        return results
    }
    catch(e){
        console.log(`Error on getUser function, reason : ${e}`)
    }
}

/**
 * add gold to the user given the user_id
 * @param gold 
 * @param user_id 
 * @returns QueryResult
 */
export async function addGold(gold : number, user_id : string){
    try{
        const results : QueryResult = await pool.query(`
            UPDATE users SET gold = gold + $1 WHERE user_id = $2
            RETURNING *;`, [gold, user_id])

        return results;

    }catch(e){
        console.log(`Error on addGold function, reason : ${e}`);
    }
}






