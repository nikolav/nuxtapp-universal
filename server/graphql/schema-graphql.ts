export const typeDefs = /* Graphql */ `
  scalar JsonData

  type Query {
    status: JsonData!
  }

  type Mutation {
    demo: JsonData!
  }
`;
