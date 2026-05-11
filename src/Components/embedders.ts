import { Embed, EmbedBuilder } from "discord.js";
import type { LootDescription, UserData } from "../types.js";
import { evalUpgradePrice } from "../Utils/GameUtils.js";


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

export function upgradeEmbedder(user_data : UserData, userName : string ) : EmbedBuilder{

    const {lootChance, rarityChance, cooldown} = evalUpgradePrice(user_data);


    const embeds :EmbedBuilder = new EmbedBuilder()
    .setColor('Random')
    .setDescription(`## Good day, ${userName.toUpperCase()}
    You can upgrade your stats by clicking the appropritae button below
    Your current money is **${user_data.gold} DC**
    
    **Rarity Chance** = **${rarityChance} CD**: Rarity chance increase your chances to get **Legendary** category by 0.002%

    **Loot Chance** = **${lootChance} CD**: Rarity chance increase your chances to get **God-tier** loot by 0.002%

    **Reduce Work Cooldown** = **${cooldown} CD**: Reduces your Work cooldown by **30 minutes**.`)
    .setFooter({text : "\nThis is from Dystopia Organization, transactions from here is hidden."})



    return embeds;
}

export function showEmbedder(user_data : UserData, username : string){
    const embeds = new EmbedBuilder()
    .setColor('Random')
    .setDescription(`## ${username.toUpperCase()} STATS`)
    .addFields(
        {name: `Username`, value : `${username}`},
        {name: `Dystopia Currency`, value : `${user_data.gold} DC`},
        {name: `Current Cooldown`, value : `${Math.ceil(user_data.base_cooldown / 3600)} hours and ${user_data.base_cooldown % 60} seconds`},
        {name: `Current Loot Chances`, value : `Rarity Chance : ${user_data.rarity_chance}, Loot Chance : ${user_data.loot_chance}`}
    )

    return embeds;
}