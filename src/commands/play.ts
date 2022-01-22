import { SlashCommandBuilder } from "@discordjs/builders";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  entersState,
  joinVoiceChannel,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import { getVoiceLine } from "../lib/Sanity";
import { DiscordCommand } from "../types/Discord";

export const command: DiscordCommand = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play a voice line")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("the voice line to play")
        .setRequired(true)
    ) as any,
  async execute(interaction, client) {
    const string = interaction.options.getString("input");

    if (string) {
      const voiceLine = await getVoiceLine(string);
      if (voiceLine) {
        const guild = client?.guilds.cache.get(interaction.guildId!)!;
        const member = guild?.members.cache.get(interaction.member?.user.id!);
        const voiceChannel = member?.voice.channel;

        if (voiceChannel) {
          const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: guild?.id,
            adapterCreator: interaction.guild
              ?.voiceAdapterCreator as DiscordGatewayAdapterCreator,
          });

          if (connection)
            entersState(connection, VoiceConnectionStatus.Ready, 5_000);

          const audioplayer = createAudioPlayer();

          connection.subscribe(audioplayer);

          const audioFile = createAudioResource(voiceLine.voiceFile.asset.url);

          audioplayer.play(audioFile);
          entersState(audioplayer, AudioPlayerStatus.Playing, 5_000);

          audioplayer.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
          });
          interaction.reply({ content: "Playing the file!", ephemeral: true });
        } else {
          interaction.reply("Please join a voice channel");
        }
      } else {
        interaction.reply(
          "No voice line found, use /list to see all voice lines"
        );
      }
    } else {
      interaction.reply("No voice line specified");
    }
  },
};

export default command;
