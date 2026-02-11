import { gql } from "graphql-request";

// status: JsonData!
export const Q_status = gql`
  query q_status {
    status
  }
`;

// docCacheByKey(key: String!): JsonData!
export const Q_docCacheByKey = gql`
  query q_docCacheByKey($key: String!) {
    docCacheByKey(key: $key)
  }
`;
