import {
  IssueOnList,
  Settings,
  IssueStatus,
  SearchIssuesOnRepoParams
} from "../../types";
import { ApolloClient } from "apollo-client";
import { makeQueryIterator } from "../makeQueryIterator";
import { searchIssuesOnRepo } from "./searchIssuesOnRepo";

export function getIssueSearcher(
  client: ApolloClient<any>,
  settings: Settings
) {
  return async (
    status = IssueStatus.Both,
    searchTerm?: string
  ): Promise<IssueOnList[]> => {
    const { limit } = settings;
    const filterIssue = (issue: IssueOnList) => {
      if (!searchTerm) {
        return true;
      }
      const match = searchTerm.trim().toLowerCase();
      return (
        issue.title.toLowerCase().indexOf(match) > 0 ||
        issue.body.toLowerCase().indexOf(match) > 0
      );
    };
    const stopIssueQuerying = (response: any[]) => {
      return response.length >= limit;
    };
    const searchParams = { client, settings, searchTerm, status };
    const iter = makeQueryIterator<IssueOnList, SearchIssuesOnRepoParams>({
      searchParams,
      executeSearch: searchIssuesOnRepo,
      filterData: filterIssue,
      isDone: stopIssueQuerying
    });
    let { done, value } = iter.next();
    let resp = await value;
    while (!done) {
      ({ done, value } = iter.next(resp));
      resp = await value;
    }
    const response = resp as IssueOnList[];
    response.reverse();
    return response.slice(0, limit);
  };
}
