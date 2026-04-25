import { type ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { upgradeEmbedder } from "../Components/embedders.js";
import { getUser } from "../../db/queries/users.js";
import type { UserData } from "../types.js";
import { RarityChanceButton } from "../Components/buttons.js";

export default {
    data : new SlashCommandBuilder()
        .setName("upgrade")
        .setDescription("upgrade your luck or cool down reduction"),

    async exec(interaction : ChatInputCommandInteraction, ){
    
        const userName = interaction.user.displayName;
        const getDBData = await getUser(interaction.user.id);

        if(!getDBData) return;

            const userData : UserData = getDBData.rows[0]

            const upgradeEmbed : EmbedBuilder = upgradeEmbedder(userData, userName);
            const buttonRow :ActionRowBuilder<ButtonBuilder>= RarityChanceButton();
            
            await interaction.followUp({ content: "Processing your request to upgrade your stats" }); 
            await interaction.followUp({ embeds : [upgradeEmbed], ephemeral: true, components : [buttonRow]}); 

    }
}
