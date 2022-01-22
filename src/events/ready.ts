import { ReadyEvent } from "../types/Discord";

export const event: ReadyEvent = {
  name: "ready",
  once: true,
  execute: (client) => {
    console.log(`Logged in as ${client?.user?.tag}!`);

    client.user?.setPresence({
      status: "online",
      activities: [
        {
          name: "Aan het snuiven...",
          type: "COMPETING",
        },
      ],
    });
  },
};
