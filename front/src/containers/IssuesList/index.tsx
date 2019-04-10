import React, { useState, useEffect } from 'react';
import { ApolloClient } from 'apollo-client';

import { withApollo } from 'react-apollo';

import { getIssueSearcher } from '../../utils/getIssueSearcher';
import { settings } from '../../settings';
import { IssueOnList, IssueStatus } from '../../types';
import { IssueStatusSelector } from '../../components/IssueStatusSelector';
import { Loading } from '../../components/Loading';
import { IssueItem } from '../../components/IssueItem';
import { Button, Box, Input, TextHeader } from '../../presententionalComponents';

function BaseIssuesList({ client }: { client: ApolloClient<any> }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(true);
  const [appliedSearchTerm, setAppliedSearchTerm] = useState<string | null>(null);
  const [issuesList, setIssuesList] = useState<IssueOnList[]>([]);
  const [issueStatus, setIssueStatus] = useState<IssueStatus>(IssueStatus.Both);

  const searchIssues = getIssueSearcher(client, settings);
  const onSearch = async () => {
    setLoading(true);
    const issues = await searchIssues(issueStatus, searchTerm);
    setAppliedSearchTerm(searchTerm);
    setIssuesList(issues);
    setLoading(false);
  };
  const onStatusChange = (status: IssueStatus) => {
    setIssueStatus(status);
  };
  useEffect(() => {
    onSearch();
  }, [issueStatus]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch();
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Input
          mr={2}
          type="text"
          value={searchTerm}
          onChange={({ target: { value: newSearchTerm } }) => setSearchTerm(newSearchTerm)}
        />
        <IssueStatusSelector value={issueStatus} onChange={onStatusChange} />
        <Button onClick={onSearch} ml={1}>
          Search
        </Button>
      </Box>

      <TextHeader>The issues:</TextHeader>
      {issuesList.map(issue => (
        <IssueItem key={issue.id} {...issue} searchTerm={appliedSearchTerm} />
      ))}
    </form>
  );
}

export const IssuesList = withApollo(BaseIssuesList);
