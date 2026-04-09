import { ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import { checkCooldown, setCooldown } from "../../db/queries/cooldowns.js";
import { regUser } from "../../db/queries/users.js";

export default {
    data : new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work to gain golds"),

    async exec(interaction : ChatInputCommandInteraction){
        const user_id = interaction.user.id;
        const user_name = interaction.user.username;

        const check = await checkCooldown(user_id, "work");

        if(check){
            await regUser(user_id, user_name);
            await setCooldown(user_id, "work", 60);
            interaction.reply({content: "You are working"})
            return;
        }
       
        interaction.reply({content: "Working is on cooldown"})

       
    }
}