import GQLError from "../errors/GQLError";
// @ts-ignore
// eslint-disable-next-line import/first
import Taro from '@tarojs/taro'

type GQLType = {operationName?: string; query: string }
export const gql = (
  literals: string | readonly string[],
  ...args: any[]
): GQLType  => {

  if (typeof literals === 'string') {
    literals = [literals];
  }

  let result = literals[0];

  args.forEach((arg, i) => {
    if (arg && arg.kind === 'Document') {
      result += arg.loc.source.body;
    } else {
      result += arg;
    }
    result += literals[i + 1];
  });

  const hasSDL = result.match(/\b(\w+)\b[\s|\n]+(\w+)/)
  if (!hasSDL || !(hasSDL.length >= 2 && hasSDL.length <= 3)) {
    throw new GQLError("Failed to parse SDL.")
  }

  const operationType = hasSDL[1]
  if (!['query', 'mutaion', 'subscription'].includes(operationType)) {
    throw new GQLError("Failed to parse SDL.")
  }

  const operationName = hasSDL[2] ? hasSDL[2] : null;
  return {operationName, query: result}
}

const url = 'https://a1001zhuche.jds.wuchuheng.com/graphql';

type GraphQLClientType = {variables?: Object, query: GQLType}
type GraphQLClientResultType = {data: Object}
const  graphQLClient = async (option: GraphQLClientType): Promise<GraphQLClientResultType> => {
  const res = await Taro.request({
    method: "POST",
    data: {operationName:option.query.operationName,variables:option.variables,query: option.query.query},
    url
  })
  const result = res.data as GraphQLClientResultType

  return result;
}

export default graphQLClient


