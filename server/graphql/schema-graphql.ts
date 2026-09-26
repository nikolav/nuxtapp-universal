export const typeDefs = /* Graphql */ `
  scalar JsonData

  type Query {
    status(x: String): JsonData!
  }

  type Mutation {
    demo(data: JsonData): JsonData!
  }
`;
