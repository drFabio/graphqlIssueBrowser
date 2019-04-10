import { Issue, Settings, IssueStatus, SearchIssuesOnRepoParams } from '../../types';
import { ApolloClient } from 'apollo-client';
import { makeQueryIterator } from '../makeQueryIterator';
import { runIterationUtilCompletion } from '../runIterationUtilCompletion';
import { searchIssuesOnRepo } from './searchIssuesOnRepo';

export function getIssueSearcher(client: ApolloClient<any>, settings: Settings) {
  return async (status = IssueStatus.Both, searchTerm?: string): Promise<Issue[]> => {
    const DEBUG_OFFLINE = true;
    const { limit } = settings;
    const filterIssue = (issue: Issue) => {
      if (!searchTerm) {
        return true;
      }
      const match = searchTerm.trim().toLowerCase();
      return issue.title.toLowerCase().indexOf(match) > 0 || issue.body.toLowerCase().indexOf(match) > 0;
    };
    const stopIssueQuerying = (response: any[]) => {
      return response.length >= limit;
    };
    const searchParams = { client, settings, searchTerm, status };
    try {
      if (DEBUG_OFFLINE) {
        throw new Error();
      }
      const iter = makeQueryIterator<Issue, SearchIssuesOnRepoParams>({
        searchParams,
        executeSearch: searchIssuesOnRepo,
        filterData: filterIssue,
        isDone: stopIssueQuerying,
      });
      const response = await runIterationUtilCompletion<Issue>(iter);
      return response.slice(0, limit);
    } catch (err) {
      if (err.message.startsWith('Network error:') || DEBUG_OFFLINE) {
        const assetModule: any = await import('../../assets/issues.json');
        const offlineIssues = assetModule.default.offlineIssues as Issue[];
        console.log(`searching offline issues ${{ status, searchTerm }}`);
        const response: Issue[] = [];
        offlineIssues.every(issue => {
          const isDesiredStatus =
            status === IssueStatus.Both ||
            (status === IssueStatus.Open && !issue.closed) ||
            (status === IssueStatus.Closed && issue.closed);

          if (isDesiredStatus && filterIssue(issue)) {
            response.push(issue);
          }
          return !stopIssueQuerying(response);
        });
        return response;
      }
      throw err;
    }
  };
}
