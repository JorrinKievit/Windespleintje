import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import { DiscordCommand } from "../types/Discord";

export const command: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
  async execute(interaction: CommandInteraction) {
    await interaction.reply("pong");
  },
};

export default command;
