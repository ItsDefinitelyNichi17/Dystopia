import { ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import { checkCooldown, getCooldownInterval, setCooldown } from "../../db/queries/cooldowns.js";
import { getProbLoot } from "../Utils/GameUtils.js";
import type { LootDescription, UserData } from "../types.js";
import { workEmbedder } from "../Components/embedders.js";
import { addGold, getUser } from "../../db/queries/users.js";

export default {
    data : new SlashCommandBuilder()
        .setName("work")
        .setDescription("Work to gain golds"),

    async exec(interaction: ChatInputCommandInteraction, command_container : Set<string>){

        const user_id = interaction.user.id;

        if(command_container.has(user_id)){ // this make sure that the user cant spam this command
            await interaction.followUp("You are doing some work, wait for it to finish processing.");
            return;
        }
        
        command_container.add(user_id);
        const check = await checkCooldown(user_id, "work");

        if(check){

            const userFromDB = await getUser(user_id);
            
            if(!userFromDB) return;

            const userData : UserData = userFromDB.rows[0];
            await setCooldown(user_id, "work", userData.base_cooldown);

            if(!userFromDB) return; // removes the "might be UNDEFINED", preventing this ! for type safety

                const loot_chance : number = userData.loot_chance;
                const rarity_chance : number = userData.rarity_chance;
                
                const loot : LootDescription | undefined = getProbLoot(loot_chance, rarity_chance);
                const userName = interaction.user.displayName
                
                if(loot){
                    const lootEmbed = workEmbedder(userName, loot, loot_chance);
                    addGold(loot.cash, user_id);
                    await interaction.followUp({ embeds : [lootEmbed]});
                }

        }else{
            const intervalData = await getCooldownInterval(user_id, "work");
            interaction.followUp({content: 
                `Work is on cooldown : **${intervalData.hours}** hour(s) **${intervalData.minutes}** minute(s) and **${intervalData.seconds}** second(s)`});
        }

        command_container.delete(user_id);
        return;
        
    }
}