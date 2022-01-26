import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";
import { getVoiceLines } from "../lib/Sanity";
import { DiscordCommand } from "../types/Discord";

export const command: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("List all voice lines"),
  async execute(interaction) {
    const voiceLines = await getVoiceLines();
    const embed = new MessageEmbed()
      .setColor("#00ff00")
      .setTitle("Voice Lines")
      .setDescription(
        voiceLines
          .map(
            (voiceLine) =>
              `[${voiceLine.commandName}](${voiceLine.voiceFile.asset.url})`
          )
          .join("\n")
      );
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
