import getPlatformType, {AllPlatformType} from "../util/platformType";

const tradePay = (tradeNo: string): Promise<void> => {
  return new Promise((resolve, reject) => {

    switch (getPlatformType()) {
      case AllPlatformType.ALIPAY:
        // @ts-ignore
        my.tradePay({
          tradeNO: tradeNo,
          success: (res) => resolve(res),
          fail: (res) => reject(res)
        });
        break;
      case AllPlatformType.WECHAT:
        // todo wech pay
        break;
    }
  })
}

export default tradePay
