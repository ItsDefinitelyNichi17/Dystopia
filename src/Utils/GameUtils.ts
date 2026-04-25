import fs from 'fs'
import path from 'path'
import type { LootDescription, Loots, UserData } from '../types.js';

type CategList = "common" | "rare" | "legendary"

/**
 * takes the loosts.json and convert into an object using JSON.parse()
 * @returns Loots
 */
function getLootsJson() : Loots{

    const jsonPath = path.join(import.meta.dirname, '..', 'loots.json');
    const jsFile =  fs.readFileSync(jsonPath).toString();
    return JSON.parse(jsFile).loots;

}

/**
 * Returns a probabilistic weight of each category "common : 80%", "rare : 18%", "legendary 2%"
 * 
 * It uses Cumulative Probaibility which adds all the weight and checks what loot it falls to using (random_weight <= categ.weight)
 * @returns CategList | undefined
 */
function getRandomCategory(rarity_chance : number) : CategList | undefined{
   
    const rarity_categ  = [
        {name : "Common", weight : 80},
        {name : "Rare", weight : 18},
        {name : "Legendary", weight : ( 2 + (rarity_chance * 100)) }
    ]
    const total_weight = rarity_categ.reduce((accumulator, currentVal)=>{ // add all the weight in rarity_categ
        return accumulator + currentVal.weight;
    }, 0);
 
    
    let random_weight = Math.floor(Math.random() * total_weight) + 1;

    for (const categ of rarity_categ){
        if(random_weight <= categ.weight){ // if the first number is greater than 80, then random_weight - current_weight
            return categ.name as CategList
        }
        random_weight -= categ.weight;
    }
}

/**
 * 
 * Returns a probabilistic weight of each loot, check it on [loots.json](../loots.json)
 * It uses Cumulative Probaibility which adds all the weight and checks
 * what loot it falls to using (random_weight <= categ.weight). 
 * @param loot_chance  :  To increase the chances of Legendary loots.
 * @param rarity_chance : To increase the chances of God-tier group.
 * @returns LootsDescription | undefined
 */
export function getProbLoot(loot_chance : number, rarity_chance : number) : LootDescription | undefined {

    const categ = getRandomCategory(rarity_chance);
    const randLootsByCateg = getLootsJson()[categ!];
    const total_weight = randLootsByCateg.reduce((accumulator, currentVal)=>{
      
        if(currentVal.group === "God-tier"){
            currentVal.chance = currentVal.chance + (loot_chance * 100);
        }
        return accumulator += currentVal.chance;
    }, 0);


    let random_weight = Math.floor(Math.random() * total_weight) + 1
   

    for(const loot  of randLootsByCateg){
        if(random_weight <= loot.chance){
            return loot as LootDescription
        }

        random_weight -= loot.chance
    }
}

export function evalUpgradePrice(userData : UserData){

    const data = userData;

    const cd = data.base_cooldown;
    const lootC = data.loot_chance;
    const rarityC = data.rarity_chance;

    return{
        lootChance : (lootC / 0.002) + 1,
        rarityChance : (rarityC / 0.002) + 1,
        cooldown : ((14400 - cd) / 1800) + 1 // 300 is 30 mins
    } 

}