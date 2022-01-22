import { Intents } from "discord.js";
import { config } from "dotenv";
import { resolve } from "path";
import { DiscordClient } from "./lib/DiscordClient";
import { AddCommandsToClient, ReadAllEvents } from "./lib/DiscordHelper";

config({ path: resolve(__dirname, "../.env") });

export const client = new DiscordClient({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client
  .login(process.env.DISCORD_TOKEN)
  .then(async () => {
    AddCommandsToClient(client);
    ReadAllEvents(client);
  })
  .catch((error) => console.log("Couldn't log in!"));
