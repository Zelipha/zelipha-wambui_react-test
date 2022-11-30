import { gql } from "@apollo/client";

const NAVIGATION = gql`
  query {
    categories {
      name
    }
  }
`;

export default NAVIGATION;
