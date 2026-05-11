import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getUser } from "../../db/queries/users.js";
import type { UserData } from "../types.js";
import { showEmbedder } from "../Components/embedders.js";

export default {
    data : new SlashCommandBuilder()
        .setName("show")
        .setDescription("Display/Check your stats"),

    async exec(interaction : ChatInputCommandInteraction){
        const user = await getUser(interaction.user.id);
        if(!user) return;
        const userData : UserData = user.rows[0];
        const embeds = showEmbedder(userData, interaction.user.displayName)
        await interaction.reply({embeds : [embeds]})
    }
}