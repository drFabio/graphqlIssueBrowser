export {};
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const request = require('request');
const { issuesQuery } = require('./queries');
const requestPromise = promisify(request);

async function saveIssues() {
  console.log('Saving the issues as json');

  const issuesFile = path.resolve(__dirname, '../src/assets/issues.json');
  fs.truncateSync(issuesFile);
  const issuesStream = fs.createWriteStream(issuesFile);
  issuesStream.write(Buffer.from('{"offlineIssues":['));
  const options = {
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
    },
    method: 'POST',
    json: {
      query: issuesQuery,
      variables: { repositoryName: 'react', repositoryOwner: 'facebook', limit: 100, cursor: null },
    },
  };
  let edges = null;
  let firstIssue = true;
  let cursor = null;
  const promiseWrite = promisify(issuesStream.write.bind(issuesStream));
  do {
    if (cursor) {
      options.json.variables.cursor = cursor;
    }
    console.log(`Requesting with cursor ${cursor}`);
    const response = await requestPromise(options);
    if (!response.body.data.repository) continue;
    ({ edges } = response.body.data.repository.issues);
    console.log('HERE and edges ', edges.length);
    if (edges.length) {
      ({ cursor } = edges[0]);
      for (const edge of edges) {
        let data = JSON.stringify(edge.node, null, 2);
        if (firstIssue) {
          firstIssue = false;
        } else {
          data = `,${data}`;
        }
        console.log(`Starting write of ${edge.node.number}`);
        await promiseWrite(Buffer.from(data));
      }
    }
  } while (edges && edges.length);
  issuesStream.end(Buffer.from(']}'));
}
saveIssues()
  .then(() => {
    console.log('Saved issues!');
  })
  .catch(err => {
    console.error(err);
  });
