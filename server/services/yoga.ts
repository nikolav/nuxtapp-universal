import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "#server/graphql/schema-graphql";
import resolvers from "#server/graphql/resolvers/index";

export const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});
