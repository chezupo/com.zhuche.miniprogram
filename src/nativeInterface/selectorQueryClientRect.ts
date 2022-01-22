import { NodesRef } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import {alipay} from "./base";

export const selectorQueryClientRect = (
  selector: string,
): Promise<NodesRef.BoundingClientRectCallbackResult> => {
  return new Promise(resolve => {
    switch (process.env.TARO_ENV) {
      case alipay:
        my.createSelectorQuery()
          .select(selector).boundingClientRect()
          .exec(ret => {
            if(ret) {
              const item = ret[0];
              resolve(item)
            }
            return Promise.reject();
          })

        break;
      default:
        Taro.createSelectorQuery()
          .select(selector)
          .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
            resolve(res)
          })
          .exec()
    }

  });
}
