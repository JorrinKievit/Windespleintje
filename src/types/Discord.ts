import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, GuildMember, Message } from "discord.js";
import { DiscordClient } from "../lib/DiscordClient";

export interface DiscordCommand {
  data: SlashCommandBuilder;
  execute: (
    interaction: CommandInteraction,
    client?: DiscordClient,
    args?: string[]
  ) => void;
}

export interface DiscordEvent {
  name: string;
  once: boolean;
}

export interface MessageEvent extends DiscordEvent {
  execute(message?: Message, client?: DiscordClient): void;
}

export interface InteractionCreateEvent extends DiscordEvent {
  execute(interaction?: CommandInteraction, client?: DiscordClient): void;
}

export interface ReadyEvent extends DiscordEvent {
  execute(client: DiscordClient): void;
}

export interface GuildMemberAddEvent extends DiscordEvent {
  execute(member?: GuildMember, client?: DiscordClient): void;
}

export interface GuildMemberRemoveEvent extends DiscordEvent {
  execute(member?: GuildMember, client?: DiscordClient): void;
}
