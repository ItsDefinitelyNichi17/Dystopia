import { Client, Collection, SlashCommandBuilder } from "discord.js"
import type { QueryResult } from "pg";

// Classes

export interface ClientTypes extends Client{
    commands : Collection <string,Function>
}

// CommandTypes : Object Literal

export interface CommandType{
    data : SlashCommandBuilder;
    exec : Function;
}

export type Rows  = QueryResult & {}