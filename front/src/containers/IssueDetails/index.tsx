import * as React from "react";
import { Query } from "react-apollo";
import { withApollo } from "react-apollo";
import { getCommentsSearcher } from "../../utils/getCommentsSearcher";

import { issueDetailsQuery as query } from "../../queries/issueDetailsQuery";
import { settings } from "../../settings";

import { IssueDisplay } from "../../components/IssueDisplay";

import {
  IssueDetailsProps,
  IssueDetailsResponse,
  CommentOnIssue
} from "../../types";

const { useState, useEffect } = React;

function BaseIssueDetails({ match, client }: IssueDetailsProps) {
  const [issueComments, setIssueComments] = useState<CommentOnIssue[]>([]);

  const number = parseInt(match.params.issueNumber, 10);
  const searchComments = getCommentsSearcher(client, settings);

  const executeSearchComents = async () => {
    const comments = await searchComments(number);
    setIssueComments(comments);
  };
  useEffect(() => {
    executeSearchComents();
  }, []);
  const { repositoryOwner, repositoryName } = settings;
  const variables = { repositoryName, repositoryOwner, number };

  return (
    <Query {...{ variables, query }}>
      {({ loading, data, error }: IssueDetailsResponse) => {
        if (loading) {
          return `loading...`;
        }
        if (error || !data) {
          return error || "Data not found";
        }
        return (
          <IssueDisplay data={data.repository.issue} comments={issueComments} />
        );
      }}
    </Query>
  );
}
export const IssueDetails = withApollo(BaseIssueDetails);
