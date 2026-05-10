import { type ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js";
import { upgradeEmbedder } from "../Components/embedders.js";
import { getUser } from "../../db/queries/users.js";
import type { UserData } from "../types.js";
import { RarityChanceButton } from "../Components/buttons.js";
import { redis } from "../Utils/redis.js";
import { interactionButtonLogic } from "../Interactions/ButtonInteraction.js";

export default {
    data : new SlashCommandBuilder()
        .setName("upgrade")
        .setDescription("upgrade your luck or cool down reduction"),

    async exec(interaction : ChatInputCommandInteraction, ){
        
        await interaction.deferReply({flags:MessageFlags.Ephemeral});
        const userName = interaction.user.displayName;
        const getDBData = await getUser(interaction.user.id);
     
        const isInteracted = await redis.exists(interaction.user.id);

        if(!getDBData) return;
            
        if(isInteracted){
            await interaction.followUp({ content: "You still have active interaction, please finish that first." }); 
            return;
        }
            
            const userData : UserData = getDBData.rows[0]

            const upgradeEmbed : EmbedBuilder = upgradeEmbedder(userData, userName);
            const buttonRow :ActionRowBuilder<ButtonBuilder>= RarityChanceButton();
            
            const response = await interaction.followUp({ embeds : [upgradeEmbed], ephemeral: true, components : [buttonRow],fetchReply:true}); 

        redis.set(interaction.user.id, interaction.commandName, {ex : 30});

        const collector = response.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id,
            time: 30000
        });

        collector.on('collect', async (i) => {
            if(i.isButton()){
                await interactionButtonLogic(i)
            }
            collector.stop("finish")
        });

        collector.on('end', async (collected, reason) => {
      
            await redis.del(interaction.user.id);
            if (reason === 'time') {
                await response.edit({ 
                    content: "Interaction expired. This interaction is 30 seconds only", 
                    components: [],
                    embeds: []
                });
            }
        });
    }
}
