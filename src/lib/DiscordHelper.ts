import { ApplicationCommandData } from "discord.js";
import fs from "fs";
import path from "path";
import { DiscordClient } from "./DiscordClient";

export const AddCommandsToClient = async (client: DiscordClient) => {
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "../commands"))
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  let slashCommands: ApplicationCommandData[] = [];

  for (const file of commandFiles) {
    const { command } = await import(
      path.join(__dirname, `../commands/${file}`)
    );
    client.commands.set(command.data.name, command);

    const { execute, ...slashCommand } = command;
    slashCommands.push(slashCommand.data);
  }

  if (process.env.NODE_ENV === "development") {
    const guild = client.guilds.cache.get("694491955341819914");
    await guild?.commands.set(slashCommands);
  }
  if (process.env.NODE_ENV === "production") {
    await client.application?.commands.set(slashCommands);
  }
};

export const ReadAllEvents = async (client: DiscordClient) => {
  const eventFiles = fs
    .readdirSync(path.join(__dirname, "../events"))
    .filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

  for (const file of eventFiles) {
    const { event } = await import(path.join(__dirname, `../events/${file}`));
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }
};
