import { gql } from "graphql-request";

export const M_status = gql`
  mutation m_status {
    status
  }
`;
