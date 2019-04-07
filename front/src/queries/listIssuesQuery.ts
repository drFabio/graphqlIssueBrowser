import gql from "graphql-tag";

export const listIssuesQuery = gql`
  query(
    $repositoryOwner: String!
    $repositoryName: String!
    $cursor: String
    $limit: Int!
    $filterBy: IssueFilters
  ) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      issues(last: $limit, before: $cursor, filterBy: $filterBy) {
        edges {
          node {
            id
            closed
            number
            title
            body
          }
          cursor
        }
      }
    }
  }
`;
