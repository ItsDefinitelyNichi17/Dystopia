import fs from 'fs'
import path from 'path'
import type { LootDescription, Loots } from '../types.js';

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
function getRandomCategory() : CategList | undefined{
   
    const rarity_categ  = [
        {name : "common", weight : 80},
        {name : "rare", weight : 18},
        {name : "legendary", weight : 2}
    ]
    const total_weight = rarity_categ.reduce((accumulator, currentVal)=>{ // add all the weight iin rarity_categ
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
 * Returns a probabilistic weight of each loot, check it on [loots.json](../loots.json)
 * It uses Cumulative Probaibility which adds all the weight and checks what loot it falls to using (random_weight <= categ.weight)
 * @returns LootsDescription | undefined
 */
export function getRandomLoot() : LootDescription | undefined {

    const categ = getRandomCategory();
    const randLootsByCateg = getLootsJson()[categ!];

    const total_weight = randLootsByCateg.reduce((accumulator, currentVal)=>{
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



// stress test : use to check for errors

/* let count = 0;
while(true){
    count ++;
    const loot = getRandomLoot();
    if(count === 1000 || loot === undefined){
        console.log(loot)
        break;
    }
} */