import {Client, GatewayIntentBits, type Interaction, Collection} from 'discord.js'
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

bot.commands = new Collection;

await commandHandler(bot);

console.log(bot.commands);


/* 
bot.on('interactionCreate', (interact : Interaction) => {
    if(interact.isChatInputCommand()){
        
    }
})
bot.on('clientReady', (event : Client)=>{
    console.log("Bot is ready")
})

bot.login(process.env.BOT_TOKEN); */