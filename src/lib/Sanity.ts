import Sanityclient from "@sanity/client";
import {
  VoiceLinesResponse,
  VoiceLinesResponses,
} from "../types/SanityResponses";

export const sanityClient = new Sanityclient({
  projectId: "y44rln8p",
  dataset: "production",
  apiVersion: `v${new Date().toISOString().split("T")[0]}`,
  token: "",
  useCdn: true,
});

export const getVoiceLines = async () => {
  const query = `*[_type == "voiceLines"] {commandName, voiceFile{asset->{_id, _type, url}}}`;

  let data = await sanityClient.fetch<VoiceLinesResponses>(query);

  return data;
};

export const getVoiceLine = async (commandName: string) => {
  const query = `*[_type == "voiceLines" && commandName == $commandName] {commandName, voiceFile{asset->{_id, _type, url}}}`;
  let data = await sanityClient.fetch<VoiceLinesResponses>(query, {
    commandName,
  });
  return data[0];
};
