import { gql } from "graphql-request";

// status: JsonData!
export const Q_status = gql`
  query q_status {
    status
  }
`;
