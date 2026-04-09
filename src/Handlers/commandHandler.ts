import {type ClientTypes,  type CommandType} from '../types.js'
import { getAllCommands } from '../Utils/FileModerators.js'

/**
 * it takes all the commands from Command folder 
 * and insert to the bot.commands Collection.
 * @param bot 
 */
export default async function commandHandler (bot : ClientTypes){
    const command_list : Array <CommandType> = await getAllCommands();

    for( const {data, exec} of command_list){
        bot.commands.set(data.name, exec);
    }
}

