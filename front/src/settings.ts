import { Settings as SettingsType } from "./types";

export const settings: SettingsType = {
  graphqlUrl: "https://api.github.com/graphql",
  limit: 100,
  token: process.env.GITHB_TOKEN as string,
  repositoryOwner: "facebook",
  repositoryName: "react"
};
