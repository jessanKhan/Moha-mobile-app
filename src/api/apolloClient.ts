import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Replace with your GraphQL API endpoint
const GRAPHQL_URI = 'http://146.190.99.6:4000/graphql';

const client = new ApolloClient({
    link: new HttpLink({
        uri: GRAPHQL_URI,
    }),
    cache: new InMemoryCache(),
});

export default client;