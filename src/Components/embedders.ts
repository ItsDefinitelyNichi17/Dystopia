import { EmbedBuilder, type ColorResolvable } from "discord.js";
import type { LootDescription } from "../types.js";


export function workEmbedder(author : string, color : ColorResolvable, data : LootDescription){

    const embeds = new EmbedBuilder()
    .setColor(color)
    .setDescription(`# ATTENTION: ${author} found a ${data.name}\n
        Now it is being processed by the *Dystopia Organization*.
        \n **ALL THINGS BELONGS TO THEM**\n\n `)
    .addFields(
        { name : `Loot Name`, value : `${data.name} \t`, inline : true }, 
        { name : 'Category', value : `**${data.categ}**`, inline : true},
        { name : '', value : ``, inline : true},
        { name : 'Value', value : `**${data.cash} DC**`, inline : true},
        { name : 'Chances', value : `**${data.chance}%**`, inline : true},
        { name : '', value : ``, inline : true},
    )

    return embeds
}