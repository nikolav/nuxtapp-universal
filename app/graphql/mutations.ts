import { gql } from "graphql-request";

// demo(data: JsonData): JsonData!
export const M_demo = gql`
  mutation m_demo($data: JsonData) {
    demo(data: $data)
  }
`;

// docCacheByKeyPatch(key: String!, patch: JsonData!): JsonData!
export const M_docCacheByKeyPatch = gql`
  mutation m_docCacheByKeyPatch($key: String!, $patch: JsonData!) {
    docCacheByKeyPatch(key: $key, patch: $patch)
  }
`;

// docCacheByKeyPathsDrop(key: String!, paths: [String!]!): JsonData!
export const M_docCacheByKeyPathsDrop = gql`
  mutation m_docCacheByKeyPathsDrop($key: String!, $paths: [String!]!) {
    docCacheByKeyPathsDrop(key: $key, paths: $paths)
  }
`;

// collectionBatchUpsert(tag: String!, patches: [JsonData!]!): JsonData!
export const M_collectionBatchUpsert = gql`
  mutation m_collectionBatchUpsert($tag: String!, $patches: [JsonData!]!) {
    collectionBatchUpsert(tag: $tag, patches: $patches)
  }
`;

// collectionDropIds(tag: String!, ids: [ID!]!): JsonData!
export const M_collectionDropIds = gql`
  mutation m_collectionDropIds($tag: String!, $ids: [ID!]!) {
    collectionDropIds(tag: $tag, ids: $ids)
  }
`;
