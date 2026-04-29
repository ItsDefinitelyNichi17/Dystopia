import { Client, Collection, SlashCommandBuilder } from "discord.js"

// Classes

export interface ClientTypes extends Client{
    commands : Collection <string,Function>
}

// CommandTypes : Object Literal
export interface CommandType{
    data : SlashCommandBuilder;
    exec : Function;
}


export interface UserStats{
    chance : number;
    cooldown : number;
}

//LootsTypes
export interface LootDescription{
    name : string,
    categ : string,
    cash : number,
    chance : number,
    group : string
}
export interface Loots{
    common : Array<LootDescription>
    rare : Array<LootDescription>
    legendary : Array<LootDescription>
}

//UserData

export interface UserData{
    user_id: string,
    username : string,
    gold : number,
    rarity_chance : number,
    loot_chance : number,
    base_cooldown : number
}

export interface evalPriceType{
    lootChance : number,
    rarityChance : number,
    cooldown : number
}