import gql from "graphql-tag";

export const issueDetailsQuery = gql`
  query($repositoryOwner: String!, $repositoryName: String!, $number: Int!) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      issue(number: $number) {
        title
        bodyHTML
        createdAt
        author {
          login
        }
        comments(first: 10) {
          edges {
            node {
              author {
                login
              }
              bodyHTML
              id
              createdAt
            }
          }
        }
      }
    }
  }
`;
