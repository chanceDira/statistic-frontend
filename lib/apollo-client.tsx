import {ApolloClient,InMemoryCache} from "@apollo/client";

export const getApolloClient = () => {
    return new ApolloClient({
        uri: 'https://statistic-backend.herokuapp.com/graphql',
        cache: new InMemoryCache()
      });
};