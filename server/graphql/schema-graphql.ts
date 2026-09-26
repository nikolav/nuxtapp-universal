export const typeDefs = /* Graphql */ `
  scalar JsonData

  type Query {
    status(x: String): JsonData!
  }

  type Mutation {
<<<<<<< HEAD
    demo: JsonData!
=======
    demo(data: JsonData): JsonData!
>>>>>>> app--ssr
  }
`;
