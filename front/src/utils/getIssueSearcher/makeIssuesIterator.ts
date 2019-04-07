import { IssueOnList, SearchIssueParams } from "../../types";
import { searchIssuesOnRepo } from "./searchIssuesOnRepo";

export function* makeIssuesIterator(
  params: SearchIssueParams
): IterableIterator<IssueOnList[] | Promise<[IssueOnList[], string | null]>> {
  const { searchTerm, settings } = params;
  let response = [];
  let [issues, cursor] = yield searchIssuesOnRepo(params);
  const issueFilterFn = (issue: IssueOnList) => filterIssue(issue, searchTerm);
  response.unshift(...issues.filter(issueFilterFn));
  while (response.length < settings.limit && issues.length) {
    [issues, cursor] = yield searchIssuesOnRepo({ ...params, cursor });
    response.unshift(...issues.filter(issueFilterFn));
  }
  response.reverse();
  return response;
}

function filterIssue(issue: IssueOnList, searchTerm?: string) {
  if (!searchTerm) {
    return true;
  }
  const match = searchTerm.trim().toLowerCase();
  return (
    issue.title.toLowerCase().indexOf(match) > 0 ||
    issue.body.toLowerCase().indexOf(match) > 0
  );
}
