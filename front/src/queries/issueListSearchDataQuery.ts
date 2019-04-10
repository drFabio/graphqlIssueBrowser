import gql from 'graphql-tag';

export const issueListSearchDataQuery = gql`
  query {
    searchTerm @client {
      value
    }
    searchStatus @client {
      value
    }
  }
`;
