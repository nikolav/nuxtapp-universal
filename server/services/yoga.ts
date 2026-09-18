import { createSchema, createYoga } from "graphql-yoga";
import resolvers from "#server/graphql/resolvers/index";

export const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar JsonData

      type Query {
        status: JsonData!
      }

      type Mutation {
        demo: JsonData!
      }
    `,
    resolvers,
  }),
});
