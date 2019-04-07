import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { Settings } from "../types";

let clientInstance: null | ApolloClient<unknown> = null;

export function getClient({ graphqlUrl, token }: Settings) {
  if (clientInstance) {
    return clientInstance;
  }
  const httpLink = createHttpLink({
    uri: graphqlUrl
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    };
  });

  const cache = new InMemoryCache();

  clientInstance = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache
  });
  return clientInstance;
}
