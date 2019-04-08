import React, { useState, useEffect } from "react";
import { ApolloClient } from "apollo-client";

import { withApollo } from "react-apollo";

import { getIssueSearcher } from "../../utils/getIssueSearcher";
import { settings } from "../../settings";
import { IssueOnList, IssueStatus } from "../../types";
import { IssueStatusSelector } from "../../components/IssueStatusSelector";
import { IssueItem } from "../../components/IssueItem";

function BaseIssuesList({ client }: { client: ApolloClient<any> }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState<string | null>(
    null
  );
  const [issuesList, setIssuesList] = useState<IssueOnList[]>([]);
  const [issueStatus, setIssueStatus] = useState<IssueStatus>(IssueStatus.Both);

  const searchIssues = getIssueSearcher(client, settings);
  const onSearch = async () => {
    console.log(`onsearch ${issueStatus} ${searchTerm}`);
    const issues = await searchIssues(issueStatus, searchTerm);
    setAppliedSearchTerm(searchTerm);
    setIssuesList(issues);
  };
  const onStatusChange = (status: IssueStatus) => {
    setIssueStatus(status);
  };
  useEffect(() => {
    onSearch();
  }, [issueStatus]);

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={({ target: { value: newSearchTerm } }) =>
          setSearchTerm(newSearchTerm)
        }
      />
      <IssueStatusSelector value={issueStatus} onChange={onStatusChange} />
      <button onClick={onSearch}>Search</button>

      <h1>The issues!</h1>
      {issuesList.map(issue => (
        <IssueItem key={issue.id} {...issue} searchTerm={appliedSearchTerm} />
      ))}
    </>
  );
}

export const IssuesList = withApollo(BaseIssuesList);
