import gql from 'graphql-tag';

export const listIssuesCommentsQuery = gql`
  query($repositoryOwner: String!, $repositoryName: String!, $issueNumber: Int!, $limit: Int!, $cursor: String) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      issue(number: $issueNumber) {
        comments(first: $limit, after: $cursor) {
          edges {
            node {
              id
              author {
                login
              }
              bodyHTML
              body
              createdAt
            }
            cursor
          }
        }
      }
    }
  }
`;
