import { EmbedBuilder, type ColorResolvable } from "discord.js";
import type { LootDescription } from "../types.js";


export function workEmbedder(author : string, data : LootDescription, loot_chance : number){

    if(data.group === "God-tier"){
       
        data.chance = data.chance + (loot_chance * 100);
    }

    const embeds = new EmbedBuilder()
    .setColor('Random')
    .setDescription(`## ATTENTION: ${author} found a ${data.name}\n
        Now it is being processed by the *Dystopia Organization*.
        \n ALL THINGS BELONGS TO THEM\n\n### RESULT:`)
    .addFields(
        { name : `Loot Name`, value : `${data.name}`,}, 
        { name : 'Category', value : `${data.categ}`},
        { name : 'Group', value : `${data.group}`},
        { name : 'Value', value : `${data.cash} DC`},
        { name : 'Chances', value : `${data.chance}%`},
    )

    return embeds
}