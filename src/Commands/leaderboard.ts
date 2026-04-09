import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data : new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Show web leaderboard"),

    exec(interaction : ChatInputCommandInteraction){
        
    }
}