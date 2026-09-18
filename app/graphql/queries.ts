import { gql } from "graphql-request";

// status: JsonData!
export const Q_status = gql`
  query q_status($x: String) {
    status(x: $x)
  }
`;
