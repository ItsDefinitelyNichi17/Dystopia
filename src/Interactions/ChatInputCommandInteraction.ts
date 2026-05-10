
import { getUser, regUser } from '../../db/queries/users.js'
import type { QueryResult } from 'pg';
import type { ClientTypes } from "../types.js";
import type { ChatInputCommandInteraction} from 'discord.js';

export async function InteractionCommandLogics(interact : ChatInputCommandInteraction, bot : ClientTypes, command_container : Set<string>){

    interact as ChatInputCommandInteraction

    const user : QueryResult | undefined = await getUser(interact.user.id);
    const user_id : string = interact.user.id;
    const user_name : string = interact.user.username;

    if (!user) return;
    
        if(user.rows.length === 0){ // register user for their first command.
            await interact.editReply({content : "You are now registered from the leaderboard!"});
            await regUser(user_id, user_name);
        }
        
        for(const command_name of bot.commands.keys()){
            if(interact.commandName === command_name){
            const commandExec = bot.commands.get(interact.commandName); // gets the exec function of the CommandType
            
            if(commandExec){
                await commandExec(interact, command_container);
            }
            }
        }
}