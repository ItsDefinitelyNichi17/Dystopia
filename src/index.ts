import {Client, GatewayIntentBits, type Interaction, Collection} from 'discord.js'
import {type ClientTypes} from './types.js'
import dotenv from "dotenv"
import commandHandler from './Handlers/commandHandler.js';
import { InteractionLogics } from './Interactions/interaction.js';

dotenv.config();

const bot = new Client({
    intents : [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
}) as ClientTypes;

const command_container :Set<string>= new Set(); //container for users that used this command and not been processed yet

bot.commands = new Collection <string, Function>; //{name of the command, execute function}

await commandHandler(bot);

bot.on('interactionCreate', async (interact : Interaction) => {
    
    // CHAT INPUT COMMNADS
    if(interact.isChatInputCommand()){
       InteractionLogics(interact, bot, command_container);
    }

    if(interact.isButton()){
        
    }
})

bot.on('clientReady', (event : Client)=>{
    console.log("Bot is ready")
})

bot.login(process.env.BOT_TOKEN);  