import gql from 'graphql-tag';

export const issueDetailsQuery = gql`
  query($repositoryOwner: String!, $repositoryName: String!, $number: Int!) {
    repository(owner: $repositoryOwner, name: $repositoryName) {
      issue(number: $number) {
        id
        closed
        number
        title
        bodyHTML
        author {
          login
        }
        createdAt
      }
    }
  }
`;
