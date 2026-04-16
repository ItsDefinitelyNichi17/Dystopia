import { ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import { checkCooldown, setCooldown } from "../../db/queries/cooldowns.js";
import { getProbLoot } from "../Utils/GameUtils.js";
import type { LootDescription } from "../types.js";
import { workEmbedder } from "../Components/embedders.js";
import { addGold } from "../../db/queries/users.js";

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
            const loot : LootDescription | undefined = getProbLoot();
            const userName = interaction.user.displayName
          
            if(loot){
                const lootEmbed = workEmbedder(userName, "DarkOrange", loot);
                addGold(loot.cash, user_id);
                await interaction.followUp({ embeds : [lootEmbed]});
            }

            
        }else{
            interaction.followUp({content: "/work is on cooldown"});
        }

        working_user.delete(user_id);
        return;
        
    }
}