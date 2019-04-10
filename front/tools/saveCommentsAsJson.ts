export {};
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const request = require('request');
const { commentsQuery } = require('./queries');
const requestPromise = promisify(request);
const issuesData = require('../src/assets/issues.json');

async function saveComents() {
  console.log('Saving the issues as json');

  const options = {
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36',
    },
    method: 'POST',
    json: {
      query: commentsQuery,
      variables: { repositoryName: 'react', repositoryOwner: 'facebook', limit: 100, cursor: null, issueNumber: 0 },
    },
  };
  let edges = null;
  for (const { number } of issuesData.offlineIssues) {
    let cursor = null;
    options.json.variables.cursor = null;
    options.json.variables.issueNumber = parseInt(number, 10);
    const commentsFile = path.resolve(__dirname, `../src/assets/commentsFor${number}.json`);
    fs.openSync(commentsFile, 'w');
    console.log(`Should have created ${commentsFile}`);
    const commentStream = fs.createWriteStream(commentsFile);
    commentStream.write(Buffer.from('{"offlineComments":['));
    const promiseWrite = promisify(commentStream.write.bind(commentStream));
    console.log(`Getting comments for issue ${number}`);
    do {
      if (cursor) {
        options.json.variables.cursor = cursor;
      }
      let firstComment = true;
      console.log(`Requesting with variables ${JSON.stringify(options.json.variables)}`);
      const response = await requestPromise(options);
      if (!response.body.data.repository) continue;
      ({ edges } = response.body.data.repository.issue.comments);
      if (edges.length) {
        ({ cursor } = edges[edges.length - 1]);
        for (const edge of edges) {
          let data = JSON.stringify(edge.node, null, 2);
          if (firstComment) {
            firstComment = false;
          } else {
            data = `,${data}`;
          }

          await promiseWrite(Buffer.from(data));
        }
      } else {
        cursor = null;
      }
      console.log('SHOULD WRITE ', edges.length, ' on ', number);
    } while (edges && edges.length);
    commentStream.write(Buffer.from(']}'));
    commentStream.end();
  }
}
saveComents()
  .then(() => {
    console.log('Saved issues!');
  })
  .catch(err => {
    console.error(err);
  });
