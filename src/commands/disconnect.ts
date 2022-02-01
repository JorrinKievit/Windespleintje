import { SlashCommandBuilder } from "@discordjs/builders";
import { getVoiceConnection } from "@discordjs/voice";
import { DiscordCommand } from "../types/Discord";

export const command: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Disconnect from channel"),
  async execute(interaction, client) {
    if (interaction.guildId) {
      const connection = getVoiceConnection(interaction.guildId);
      if (connection) {
        connection.destroy();
        interaction.reply({ content: "Left the channel", ephemeral: true });
      } else {
        interaction.reply({
          content: "No voice connection found",
          ephemeral: true,
        });
      }
    } else {
      interaction.reply({ content: "No server found", ephemeral: true });
    }
  },
};
