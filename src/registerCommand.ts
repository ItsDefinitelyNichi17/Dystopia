import {Routes, REST} from "discord.js"
import dotenv from 'dotenv'

dotenv.config()

const rest = new REST({version : '10'}).setToken(process.env.BOT_TOKEN!);

(async ()=>{
    try{
        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!))
    }catch{
        
    }
})