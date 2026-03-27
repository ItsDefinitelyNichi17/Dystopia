import {Routes, REST} from "discord.js"
import dotenv from 'dotenv'
import { getAllCommands } from "./Utils/FileModerators.js";
import type { CommandType } from "./types.js";

dotenv.config()

const rest = new REST({version : '10'}).setToken(process.env.BOT_TOKEN!);

const commands_list : Array<CommandType> = await getAllCommands();
const commands = commands_list.map((e)=> e.data.toJSON());

(async ()=>{
    try{
        console.log("registering..");
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {body : commands});
        console.log("registered");
    }catch(e){
        console.log(`Failed registering, reason : on registerCommand.ts ${e}`);
    }
})();