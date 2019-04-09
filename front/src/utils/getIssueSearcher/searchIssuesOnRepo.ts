import {
  IssueOnList,
  IssueQueryResponse,
  IssueStatus,
  SearchIssuesOnRepoParams
} from "../../types";
import { listIssuesQuery } from "../../queries/listIssuesQuery";

export async function searchIssuesOnRepo({
  client,
  settings,
  status,
  cursor
}: SearchIssuesOnRepoParams): Promise<[IssueOnList[], string | null]> {
  const { repositoryOwner, repositoryName, apiSearchLimit: limit } = settings;
  const variables: any = {
    repositoryName,
    repositoryOwner,
    limit,
    cursor
  };
  if (status !== IssueStatus.Both) {
    variables.filterBy = { states: status };
  }
  const {
    data: {
      repository: {
        issues: { edges }
      }
    }
  }: IssueQueryResponse = await client.query({
    query: listIssuesQuery,
    variables
  });
  if (!edges.length) {
    return [[], null];
  }
  const lastCursor = edges[0].cursor;
  const issues = edges.map(({ node }) => node);
  return [issues, lastCursor];
}
