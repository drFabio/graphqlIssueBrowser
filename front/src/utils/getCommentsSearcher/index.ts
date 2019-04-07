import {
  CommentOnIssue,
  Settings,
  SearchCommentsOnIssueParams
} from "../../types";
import { ApolloClient } from "apollo-client";
import { makeQueryIterator } from "../makeQueryIterator";
import { searchCommentsOnIssue } from "./searchCommentsOnIssue";

export function getCommentsSearcher(
  client: ApolloClient<any>,
  settings: Settings
) {
  return async (issueNumber: number): Promise<CommentOnIssue[]> => {
    const searchParams = { client, settings, issueNumber };
    const iter = makeQueryIterator<CommentOnIssue, SearchCommentsOnIssueParams>(
      {
        searchParams,
        executeSearch: searchCommentsOnIssue
      }
    );
    let { done, value } = iter.next();
    let resp = await value;
    while (!done) {
      ({ done, value } = iter.next(resp));
      resp = await value;
    }
    return resp as CommentOnIssue[];
  };
}
