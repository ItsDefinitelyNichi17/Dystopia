import {Client, GatewayIntentBits, } from 'discord.js'
import dotenv from "dotenv"

dotenv.config();

const bot :Client = new Client({
    intents : [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
})

bot.on('clientReady', (event : Client)=>{
    console.log("Bot is ready")
})

bot.login(process.env.BOT_TOKEN);