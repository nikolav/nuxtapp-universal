import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "#server/graphql/schema-graphql";
import resolvers from "#server/graphql/resolvers/index";
import { typeDefs } from "#server/graphql/schema-graphql";

export const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
});
