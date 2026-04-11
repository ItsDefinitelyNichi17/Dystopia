import { ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import { checkCooldown, setCooldown } from "../../db/queries/cooldowns.js";
import { regUser } from "../../db/queries/users.js";

export default {
    data : new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work to gain golds"),

    async exec(interaction : ChatInputCommandInteraction){

        const user_id = interaction.user.id;
        const check = await checkCooldown(user_id, "work");

        if(check){
            await setCooldown(user_id, "work", 60);
            await interaction.followUp({content: "You are working"})
            return;
        }
       
        interaction.followUp({content: "Working is on cooldown"});
    }
}