import { gql } from "graphql-request";

// demo(data: JsonData): JsonData!
export const M_demo = gql`
  mutation m_demo($data: JsonData) {
    demo(data: $data)
  }
`;
