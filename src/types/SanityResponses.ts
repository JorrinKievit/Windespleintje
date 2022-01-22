export type VoiceLinesResponse = {
  commandName: string;
  voiceFile: VoiceFile;
};

export type VoiceLinesResponses = VoiceLinesResponse[];

export type VoiceFile = {
  asset: { _id: string; _type: string; url: string };
};
