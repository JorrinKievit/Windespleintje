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
      .setFields(
        voiceLines.map((voiceLine) => {
          console.log(voiceLine);
          return {
            name: voiceLine.commandName,
            value: voiceLine.voiceFile.asset.url,
          };
        })
      );
    interaction.reply({ embeds: [embed] });
  },
};

export default command;
