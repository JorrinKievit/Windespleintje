import { Client, ClientOptions, Collection } from "discord.js";
import { DiscordCommand } from "../types/Discord";

export class DiscordClient extends Client {
  public commands: Collection<string | undefined, DiscordCommand>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}
