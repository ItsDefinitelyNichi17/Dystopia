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