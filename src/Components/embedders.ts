import { EmbedBuilder } from "discord.js";
import type { UserStats } from "../types.js";


export function gainGoldEmbedder( gold : string, reason : string, author : string, user_stats : UserStats){

    const {chance, cooldown} = user_stats
    const embeds = new EmbedBuilder()
    .setTitle(`Here is your payment`)
    .setDescription(`${author} gained a ${gold} by ${reason}`)
    .setAuthor({name : author})
    .addFields(
        { name : `luck`, value : `${chance}`, inline : true }, 
        { name : 'cooldown', value : `${cooldown}`, inline : true})
    
    return embeds
}