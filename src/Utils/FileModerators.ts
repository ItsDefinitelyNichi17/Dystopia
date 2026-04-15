import fs from 'fs';
import path from 'path';
import { type CommandType } from '../types.js';

/**
 * It returns an Array of commands object from Commands Folder
 * @returns Array<CommandType>
 */
export async function getAllCommands(){

    const command_list : Array <CommandType> = [];

    const folder_path = path.join(import.meta.dirname, ".." , "Commands");
    const files = fs.readdirSync(folder_path); 

    for (const file of files){
        
        const file_path = path.join(folder_path, file);
        
        try{
            const data = await import(file_path);
            command_list.push(data.default);
        }catch(e){
            console.log(`FileModerator.ts Error at getAllCommands : ${e}`);
        }
    }

    return command_list;
    
}