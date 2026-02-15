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

// collectionByTag(tag: String!): JsonData!
export const Q_collectionByTag = gql`
  query q_collectionByTag($tag: String!) {
    collectionByTag(tag: $tag)
  }
`;

// collectionByTagCount(tag: String!): JsonData!
export const Q_collectionByTagCount = gql`
  query q_collectionByTagCount($tag: String!) {
    collectionByTagCount(tag: $tag)
  }
`;
