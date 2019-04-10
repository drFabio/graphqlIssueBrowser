const issuesQuery = `
    query ($repositoryOwner: String!, $repositoryName: String!, $cursor: String, $limit: Int!, $filterBy: IssueFilters) {
        repository(owner: $repositoryOwner, name: $repositoryName) {
        issues(last: $limit, before: $cursor, filterBy: $filterBy) {
            edges {
            node {
                id
                closed
                number
                title
                body
                bodyHTML
                author {
                login
                __typename
                }
                createdAt
                __typename
            }
            cursor
            __typename
            }
            __typename
        }
        __typename
        }
    }
`;

const commentsQuery = `
query ($repositoryOwner: String!, $repositoryName: String!, $issueNumber: Int!, $limit: Int!, $cursor: String) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      issue(number: $issueNumber) {
        comments(first: $limit, after: $cursor) {
          edges {
            node {
              id
              author {
                login
                __typename
              }
              bodyHTML
              body
              createdAt
              __typename
            }
            cursor
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
  
`;
module.exports = {
  issuesQuery,
  commentsQuery,
};
