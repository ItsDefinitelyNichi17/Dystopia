import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export function RarityChanceButton() : ActionRowBuilder<ButtonBuilder>{

    const buttonDetails = [{
        customId : "RChanceButt",
        label : "Rarity Chance"
    },
    {
        customId : "LChanceButt",
        label : "Loot Chance"
    },
    {
        customId : "reduceCD",
        label : "Reduce Work Cooldown"
    }]


    const buttons = buttonDetails.map((currentVal)=>{
        return new ButtonBuilder()
        .setCustomId(currentVal.customId)
        .setLabel(currentVal.label)
        .setStyle(ButtonStyle.Primary)
    })
   
    const buttonRow = new ActionRowBuilder<ButtonBuilder>().addComponents(buttons);

    return buttonRow;
}