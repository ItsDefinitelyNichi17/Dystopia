import {Client, GatewayIntentBits, type Interaction, Collection, ChatInputCommandInteraction} from 'discord.js'
import {type ClientTypes} from './types.js'
import dotenv from "dotenv"
import commandHandler from './Handlers/commandHandler.js';

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

bot.on('interactionCreate', (interact : Interaction) => {
    
    if(interact.isChatInputCommand()){
        interact as ChatInputCommandInteraction
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