import UserProvider from "@/app/providers/UserProvider/UserProvider";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { Outlet } from "react-router-dom";
import "./index.css";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL,
  credentials: "include",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_API_NOTIFICATIONS_URL,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,

  cache: new InMemoryCache(),
  credentials: "include",
});

// @NOTE: мидлвары сюда
const App = () => (
  <ApolloProvider client={client}>
    <UserProvider>
      <Outlet />
    </UserProvider>
  </ApolloProvider>
);

export default App;
