import {
  CommentOnIssue,
  ComentQueryResponse,
  SearchCommentsOnIssueParams
} from "../../types";
import { listIssuesCommentsQuery as query } from "../../queries/listIssuesCommentsQuery";

export async function searchCommentsOnIssue({
  cursor,
  settings,
  issueNumber,
  client
}: SearchCommentsOnIssueParams): Promise<[CommentOnIssue[], string | null]> {
  const { repositoryOwner, repositoryName, apiSearchLimit: limit } = settings;
  const variables = {
    repositoryName,
    repositoryOwner,
    limit,
    issueNumber,
    cursor
  };
  const {
    data: {
      repository: {
        issue: {
          comments: { edges }
        }
      }
    }
  }: ComentQueryResponse = await client.query({
    query,
    variables
  });
  if (!edges.length) {
    return [[], null];
  }
  let lastCursor = null;
  if (edges.length) {
    lastCursor = edges[edges.length - 1].cursor;
  }
  const comments = edges.map(({ node }) => node);
  return [comments, lastCursor];
}
