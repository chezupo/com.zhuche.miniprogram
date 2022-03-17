import Taro, {NodesRef} from "@tarojs/taro";

export const selectorQueryClientRect = (
  selector: string,
): Promise<NodesRef.BoundingClientRectCallbackResult> => {
  return new Promise((resolve, reject) => {
    switch (process.env.TARO_ENV) {
      // case alipay:
      //   my.createSelectorQuery()
      //     .select(selector).boundingClientRect()
      //     .exec(ret => {
      //       if(ret) {
      //         const item = ret[0];
      //         resolve(item)
      //       }
      //       reject()
      //     })
      //
      //   break;
      default:
        Taro.createSelectorQuery()
          .select(selector)
          .boundingClientRect((res: NodesRef.BoundingClientRectCallbackResult) => {
            resolve(res)
          })
          .exec(ret => resolve(ret[0]))
    }

  });
}
