import { ApolloClient } from "apollo-client";
import { QueryProps, QueryResult } from "react-apollo";
import { match } from "react-router-dom";

export enum IssueStatus {
  Open = "OPEN",
  Closed = "CLOSED",
  Both = "BOTH"
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
export interface IssueOnList {
  title: string;
  body: string;
  closed: boolean;
  id: string;
  number: number;
}

interface Edge<T> {
  node: T;
  cursor: string;
}

export interface IssueQueryResponse {
  data: {
    repository: {
      issues: {
        edges: Edge<IssueOnList>[];
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
type IssueDetailsData = {
  repository: {
    issue: IssueInfoOnResponse;
  };
};
type IssueDetailsVariables = {
  repositoryOwner: string;
  repositoryName: string;
  number: number;
};
export interface IssueDetailsResponse
  extends QueryResult<IssueDetailsData, IssueDetailsVariables> {}

type IssueSearchData = {
  searchTerm: {
    value: string;
  };
  searchStatus: {
    value: IssueStatus;
  };
};
export interface IssueListSearchDataResponse
  extends QueryResult<IssueSearchData, IssueDetailsVariables> {}

export interface IssueInfoOnResponse {
  title: string;
  bodyHTML: string;
  createdAt: string;
  author: {
    login: string;
  };
}

export interface SearchIssueParams {
  client: ApolloClient<any>;
  settings: Settings;
  searchTerm?: string;
  status: IssueStatus;
}
export interface SearchIssuesOnRepoParams {
  settings: SearchIssueParams["settings"];
  client: SearchIssueParams["client"];
  status: SearchIssueParams["status"];
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

export interface IssueItemProps extends IssueOnList {
  searchTerm?: string | null;
}

export interface IssueDetailsQueryProps {
  children: QueryProps["children"];
  repositoryOwner: string;
  repositoryName: string;
  number: number;
}

export type IssueDetailsProps = {
  match: match<{ issueNumber: string }>;
  client: ApolloClient<any>;
};

export type IssueDisplayProps = {
  data: IssueInfoOnResponse;
  comments?: CommentOnIssue[];
};

export type IssueCreationDataProps = {
  author: IssueInfoOnResponse["author"];
  createdAt: IssueInfoOnResponse["createdAt"];
};

export type IssueRadioProps = {
  children: React.ReactNode;
  status: IssueStatus;
  selectedValue: IssueStatus;
  name: string;
  onChange: HandleIssueChange;
};
