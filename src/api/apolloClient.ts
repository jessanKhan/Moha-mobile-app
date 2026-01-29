import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Replace with your GraphQL API endpoint
const GRAPHQL_URI = 'https://your-graphql-endpoint.com/graphql';

const client = new ApolloClient({
    link: new HttpLink({
        uri: GRAPHQL_URI,
    }),
    cache: new InMemoryCache(),
});

export default client;