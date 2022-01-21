import { NodesRef } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import {alipay} from "./base";

export const selectorQueryClientRect = (
  selector: string,
): Promise<NodesRef.BoundingClientRectCallbackResult> => {
  return new Promise(resolve => {
    let query;
    switch (process.env.TARO_ENV) {
      case alipay:
        query = my.createSelectorQuery()
        break;
      default:
      query = Taro.createSelectorQuery()
    }

    const result = query
      .select(selector)
      .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
        resolve(res)
      })
      .exec()
  });
}
