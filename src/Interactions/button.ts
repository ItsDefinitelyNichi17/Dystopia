import type { ButtonInteraction } from "discord.js";
import { AddRChance } from "../../db/queries/users.js";


export async function interactionButtonLogic(interaction : ButtonInteraction){
    interaction as ButtonInteraction

    await  interaction.deferReply();

    if(interaction.customId === 'RChanceButt'){
        
        
        await interaction.editReply({content : "Processing your request"});
        const rarity_chance =  await AddRChance(0.002, interaction.user.id);
        await interaction.followUp({content : `Your Rarity chance now is ${rarity_chance.rarity_chance}%`, ephemeral: true})
        
     
    }
}