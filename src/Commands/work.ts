import { ChatInputCommandInteraction, SlashCommandBuilder, type Interaction} from "discord.js";

export default {
    data : new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work to gain golds"),

    async exec(interaction : ChatInputCommandInteraction){
        interaction.reply({content: "working"})
    }
}