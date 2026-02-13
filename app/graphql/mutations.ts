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
