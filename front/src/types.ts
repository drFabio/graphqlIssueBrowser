import { ApolloClient } from 'apollo-client';
import { QueryProps, QueryResult } from 'react-apollo';
import { match } from 'react-router-dom';

export enum IssueStatus {
  Open = 'OPEN',
  Closed = 'CLOSED',
  Both = 'BOTH',
}
export type cursorType = string | null;
export interface WithCursor {
  cursor?: cursorType;
}

export interface Settings {
  graphqlUrl: string;
  limit: number;
  apiSearchLimit: number;
  token: string;
  repositoryOwner: string;
  repositoryName: string;
}
export interface Issue {
  title: string;
  bodyHTML: string;
  body: string;
  closed: boolean;
  id: string;
  number: number;
  createdAt: string;
  author: {
    login: string;
  };
}

interface Edge<T> {
  node: T;
  cursor: string;
}

export interface IssueQueryResponse {
  data: {
    repository: {
      issues: {
        edges: Edge<Issue>[];
        totalCount: number;
      };
    };
  };
}

export interface CommentOnIssue {
  id: string;
  author: {
    login: string;
  };
  createdAt: string;
  bodyHTML: string;
}
export interface ComentQueryResponse {
  data: {
    repository: {
      issue: {
        comments: {
          edges: Edge<CommentOnIssue>[];
        };
      };
    };
  };
}
interface IssueDetailsData {
  repository: {
    issue: Issue;
  };
}
interface IssueDetailsVariables {
  repositoryOwner: string;
  repositoryName: string;
  number: number;
}
export type IssueDetailsResponse = QueryResult<IssueDetailsData, IssueDetailsVariables>;

interface IssueSearchData {
  searchTerm: {
    value: string;
  };
  searchStatus: {
    value: IssueStatus;
  };
}
export type IssueListSearchDataResponse = QueryResult<IssueSearchData, IssueDetailsVariables>;

export interface SearchIssueParams {
  client: ApolloClient<any>;
  settings: Settings;
  searchTerm?: string;
  status: IssueStatus;
}
export interface SearchIssuesOnRepoParams {
  settings: SearchIssueParams['settings'];
  client: SearchIssueParams['client'];
  status: SearchIssueParams['status'];
  cursor?: string;
}

export interface SearchCommentsOnIssueParams {
  cursor?: string;
  settings: Settings;
  issueNumber: number;
  client: ApolloClient<any>;
}

export type HandleIssueChange = (newStatus: IssueStatus) => any;
export interface IssueStatusSelectorProps {
  value: IssueStatus;
  onChange: HandleIssueChange;
}

export interface IssueItemProps extends Issue {
  searchTerm?: string | null;
}

export interface IssueDetailsQueryProps {
  children: QueryProps['children'];
  repositoryOwner: string;
  repositoryName: string;
  number: number;
}

export interface IssueDetailsProps {
  match: match<{ issueNumber: string }>;
  client: ApolloClient<any>;
}

export interface IssueDisplayProps {
  data: Issue;
  comments?: CommentOnIssue[];
}

export interface IssueCreationDataProps {
  author: Issue['author'];
  createdAt: Issue['createdAt'];
}

export interface IssueRadioProps {
  children: React.ReactNode;
  status: IssueStatus;
  selectedValue: IssueStatus;
  name: string;
  onChange: HandleIssueChange;
}

export type IssueSearcher = (status?: IssueStatus, searchTerm?: string | undefined) => Promise<Issue[]>;
