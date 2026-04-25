import type { ButtonInteraction } from "discord.js";
import { AddLChance, AddRChance, reduceCooldown } from "../../db/queries/users.js";


export async function interactionButtonLogic(interaction : ButtonInteraction){
    interaction as ButtonInteraction
    
    const buttonData = [
        {
            name : "Rarity Chance",
            buttonName: 'RChanceButt',
            object : 'rarity_chance',
            exec: await AddRChance(0.002, interaction.user.id)
        },
        {
              
            name : "Loot Chance",
            buttonName: 'LChanceButt',
            object : 'loot_chance',
            exec: await AddLChance(0.002, interaction.user.id)
        },
        {
            name : "Cooldown",
            buttonName : "reduceCD",
            object : "base_cooldown",
            exec : await reduceCooldown(1800, interaction.user.id)
        },
    ]

    await interaction.update({ embeds: [], components: [], content: "Process is Complete, the transaction is deleted." });

    for( const button of buttonData){
        if (interaction.customId === button.buttonName){
            const result = button.exec;
            if(!(interaction.customId === "reduceCD")){
                await interaction.followUp({content : `Your ${button.name} is ${result[button.object]}%`, ephemeral: true})
                return;
            }
                await interaction.followUp({content : `Your ${button.name} is reduced by 30 mins`, ephemeral: true})
        }
    }
}