import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
    data : new SlashCommandBuilder()
        .setName("upgrade")
        .setDescription("upgrade your luck or cool down reduction"),

    exec(interaction : ChatInputCommandInteraction){
        
    }
}
