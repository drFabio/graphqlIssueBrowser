import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

import { Settings } from '../types';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

let clientInstance: null | ApolloClient<unknown> = null;

export async function getClient({ graphqlUrl, token }: Settings) {
  if (clientInstance) {
    return clientInstance;
  }
  const httpLink = createHttpLink({
    uri: graphqlUrl,
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  });

  const cache = new InMemoryCache();

  clientInstance = new ApolloClient({
    link: ApolloLink.from([authLink, httpLink]),
    cache,
  });
  const storage = window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>;

  await persistCache({ cache, storage });
  return clientInstance;
}
