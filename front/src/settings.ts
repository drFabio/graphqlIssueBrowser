import { Settings as SettingsType } from "./types";

export const settings: SettingsType = {
  graphqlUrl: "https://api.github.com/graphql",
  limit: 10,
  apiSearchLimit: 100,
  token: process.env.GITHUB_TOKEN as string,
  repositoryOwner: "facebook",
  repositoryName: "react"
};
