import {gql as graphQLParser } from "../../util/apolloClient";

const quthrizationGQL = graphQLParser`
mutation MINI_PROGRAM_AUTHORIZATION($input: MiniProgramAuthorizationInput!) {
  miniProgramAuthorization(input: $input){
    expiredAt
    tokenType
    accessToken
  }
}
`
export default quthrizationGQL

