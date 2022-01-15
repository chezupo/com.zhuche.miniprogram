import {gql as graphQLParser } from "../util/apolloClient";

const gql = graphQLParser`
  query ERRORCODES {
    errorCodes {
      message
      code
    }
  }
`

export default gql
