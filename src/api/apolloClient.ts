import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { GRAPHQL_URI as ENV_GRAPHQL_URI } from '@env';

export const GRAPHQL_URI = ENV_GRAPHQL_URI;

const client = new ApolloClient({
    link: new HttpLink({
        uri: GRAPHQL_URI,
        headers: {
            'Apollo-Require-Preflight': 'true',
        },
    }),
    cache: new InMemoryCache(),
});

export default client;