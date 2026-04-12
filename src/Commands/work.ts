import { ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import { checkCooldown, setCooldown } from "../../db/queries/cooldowns.js";

export default {
    data : new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work to gain golds"),

    async exec(interaction : ChatInputCommandInteraction, working_user : Set<string>){

        const user_id = interaction.user.id;

        if(working_user.has(user_id)){ // this make sure that the user cant spam this command
            interaction.followUp("You are doing some work, wait for it to finish processing.");
            return;
        }
        
        working_user.add(user_id);
        const check = await checkCooldown(user_id, "work");

        if(check){
            await setCooldown(user_id, "work", 60);
            await interaction.followUp({content: "You are working"});
            
        }else{
            interaction.followUp({content: "Working is on cooldown"});
        }
        working_user.delete(user_id);
        return;
        
    }
}