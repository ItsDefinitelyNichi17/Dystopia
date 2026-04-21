import {Client, GatewayIntentBits, type Interaction, Collection, ChatInputCommandInteraction, MessageFlags} from 'discord.js'
import {type ClientTypes} from './types.js'
import dotenv from "dotenv"
import commandHandler from './Handlers/commandHandler.js';
import { getUser, regUser } from '../db/queries/users.js';
import type { QueryResult } from 'pg';


dotenv.config();

const bot = new Client({
    intents : [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
}) as ClientTypes;

//container for users that used this command and not been processed yet
const command_container = new Set();

bot.commands = new Collection <string, Function>; //{name of the command, execute function}

await commandHandler(bot);

bot.on('interactionCreate', async (interact : Interaction) => {
    
    // CHAT INPUT COMMNADS
    if(interact.isChatInputCommand()){
        interact as ChatInputCommandInteraction

        await interact.deferReply();

        const user : QueryResult | undefined = await getUser(interact.user.id);
        const user_id : string = interact.user.id;
        const user_name : string = interact.user.username;

        if(user!.rows.length === 0){ // register user for their first command.
            await interact.followUp({content : "You are now registered from the leaderboard!"});
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
})

bot.on('clientReady', (event : Client)=>{
    console.log("Bot is ready")
})

bot.login(process.env.BOT_TOKEN);  