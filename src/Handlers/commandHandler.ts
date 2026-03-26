import {type ClientTypes, 
        type CommandType} from '../types.js'
import { Collection } from 'discord.js'
import { getAllCommands } from '../Utils/FileModerators.js'

export default async function commandHandler (bot : ClientTypes){

    const command_list : Array <CommandType> = await getAllCommands();

    for( const {data, exec} of command_list){
        bot.commands.set(data.name, exec);
    }
}

