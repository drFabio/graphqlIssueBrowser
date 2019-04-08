import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { getClient } from "./utils/getClient";
import { settings } from "./settings";
import { IssuesList } from "./containers/IssuesList";
import { IssueDetails } from "./containers/IssueDetails";

getClient(settings).then(client => {
  function App() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Route path="/" exact component={IssuesList} />
          <Route path="/issue/:issueNumber" exact component={IssueDetails} />
        </Router>
      </ApolloProvider>
    );
  }

  const rootElement = document.getElementById("root");
  render(<App />, rootElement);
});
