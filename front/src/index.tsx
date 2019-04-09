import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";
import { getClient } from "./utils/getClient";
import { settings } from "./settings";
import { IssuesList } from "./containers/IssuesList";
import { IssueDetails } from "./containers/IssueDetails";
import {
  GlobalStyle,
  MainContainer,
  InnerContainer,
  Header,
  Link,
  theme
} from "./presententionalComponents";

getClient(settings).then(client => {
  function App() {
    return (
      <>
        <GlobalStyle />
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <Router>
              <MainContainer>
                <Header>
                  Issue browser
                  <nav>
                    <Link to="/">Home</Link>
                  </nav>
                </Header>
                <InnerContainer>
                  <Route path="/" exact component={IssuesList} />
                  <Route
                    path="/issue/:issueNumber"
                    exact
                    component={IssueDetails}
                  />
                </InnerContainer>
              </MainContainer>
            </Router>
          </ThemeProvider>
        </ApolloProvider>
      </>
    );
  }

  const rootElement = document.getElementById("root");
  render(<App />, rootElement);
});
