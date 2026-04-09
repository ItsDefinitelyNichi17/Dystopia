import {Client, GatewayIntentBits, type Interaction, Collection, ChatInputCommandInteraction, MessageFlags} from 'discord.js'
import {type ClientTypes} from './types.js'
import dotenv from "dotenv"
import commandHandler from './Handlers/commandHandler.js';
import { getUser, regUser } from '../db/queries/users.js';

dotenv.config();

const bot = new Client({
    intents : [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
}) as ClientTypes;

bot.commands = new Collection <string, Function>; //{name of the command, execute function}

await commandHandler(bot);

bot.on('interactionCreate', async (interact : Interaction) => {
    
    if(interact.isChatInputCommand()){
        interact as ChatInputCommandInteraction

        const user_row = await getUser(interact.user.id);
        const user_id = interact.user.id;
        const user_name = interact.user.username;

        if(user_row!.rows.length === 0){ // register user for their first command.
            await interact.reply({content : "You are now registered from the leaderboard!", 
                flags : [MessageFlags.Ephemeral]});
            await regUser(user_id, user_name);
        }
        
        for(const command_name of bot.commands.keys()){
            if(interact.commandName === command_name){
               const commandExec = bot.commands.get(interact.commandName); // gets the exec function of the CommandType
               
               if(commandExec){
                 commandExec(interact);
               }
            }
        }
    }
})

bot.on('clientReady', (event : Client)=>{
    console.log("Bot is ready")
})

bot.login(process.env.BOT_TOKEN);  