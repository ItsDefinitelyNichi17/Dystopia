import { SlashCommandBuilder, type Interaction} from "discord.js";

export default {
    data : new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work to gain golds"),


    async exec(interaction : Interaction){
        console.log(interaction.user.id);
    }
}