import { InteractionCreateEvent } from "../types/Discord";

export const event: InteractionCreateEvent = {
  name: "interactionCreate",
  once: false,

  execute: async (interaction, client) => {
    if (!interaction?.isCommand()) return;

    const command = client?.commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.execute(interaction, client);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was en error executing this command!",
        ephemeral: true,
      });
    }
  },
};
