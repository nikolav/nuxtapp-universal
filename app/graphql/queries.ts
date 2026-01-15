import { gql } from "graphql-request";

export const Q_demo = gql`
  query {
    users {
      data {
        id
        name
        email
      }
    }
  }
`;
