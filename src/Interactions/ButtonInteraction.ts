import type { ButtonInteraction } from "discord.js";
import { AddLChance, AddRChance, getUser, reduceCooldown, reduceGold } from "../../db/queries/users.js";
import { evalUpgradePrice } from "../Utils/GameUtils.js";
import type { evalPriceType, UserData } from "../types.js";
import { redis } from "../Utils/redis.js";


type priceNames = 'rarityChance'  | 'lootChance' | 'cooldown'

export async function interactionButtonLogic(interaction : ButtonInteraction){

    interaction as ButtonInteraction;
   
    const data = await getUser(interaction.user.id);
    if(!data) return;

    const user_data :UserData= data.rows[0];
    const price :evalPriceType= evalUpgradePrice(user_data);

    const buttonData = [
        {
            name : "Rarity Chance",
            buttonName: 'RChanceButt',
            object : 'rarity_chance',
            price : 'rarityChance',
            exec: async() =>  AddRChance(0.002, interaction.user.id)
        },
        {
              
            name : "Loot Chance",
            buttonName: 'LChanceButt',
            object : 'loot_chance',
            price : 'lootChance',
            exec: async() => AddLChance(0.002, interaction.user.id)
        },
        {
            name : "Cooldown",
            buttonName : "reduceCD",
            object : "base_cooldown",
            price : 'cooldown',
            exec : async() => reduceCooldown(1800, interaction.user.id)
        },
    ]

    await interaction.update({ embeds: [], components: [], content: "Process is Complete, the transaction is deleted." });

    for( const button of buttonData){

        const priceName :priceNames= button.price as priceNames
        const objectPrice = price[priceName];
    
          
        if (interaction.customId === button.buttonName){
           
            if(user_data.gold < objectPrice) 
                await interaction.followUp({content : "You dont have enough money to make this transaction", ephemeral : true});

            else if(!(interaction.customId === "reduceCD")){
                //massive red flag, find a way to optimize this
                const result =await  button.exec();
                await interaction.followUp({content : `Your ${button.name} is ${result[button.object]}%`, ephemeral: true})
                await reduceGold(objectPrice, interaction.user.id);
                
            }
            else{
                await interaction.followUp({content : `Your ${button.name} is reduced by 30 mins`, ephemeral: true})
                await reduceGold(objectPrice, interaction.user.id);
                await  button.exec();
            }
              
            redis.del(interaction.user.id);
        }
    }
}