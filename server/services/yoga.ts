import { readFileSync } from "node:fs";
import path from "node:path";

import { createYoga, createSchema } from "graphql-yoga";

import { Query, Mutation } from "../graphql/resolvers";

export const yoga = createYoga({
  schema: createSchema({
    typeDefs: readFileSync(
      path.resolve(process.cwd(), "server/graphql/schema.graphql"),
      "utf-8"
    ),
    resolvers: {
      Mutation,
      Query,
    },
  }),
});
