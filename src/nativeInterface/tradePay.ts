import Taro from "@tarojs/taro";
import getPlatformType, {AllPlatformType} from "../util/platformType";

const tradePay = async (tradeNO: string, isFreeze?: boolean): Promise<void> => {
  return new Promise<void>((resolve, reject) => {

    switch (getPlatformType()) {
      case AllPlatformType.ALIPAY:
        // @ts-ignore
          my.tradePay({
            ...(isFreeze ? {orderStr: tradeNO} : {
              tradeNO
            }),
            success: (res) => resolve(res),
            fail: (res) => reject(res)
          });

        break;
      case AllPlatformType.WECHAT:
        const wechatPayToken = JSON.parse(tradeNO) as WechatPayToken;
        Taro.requestPayment({
          timeStamp: wechatPayToken.timeStamp + '',
          nonceStr: wechatPayToken.nonceStr,
          package: wechatPayToken.package,
          paySign: wechatPayToken.paySign,
          // @ts-ignore
          signType: 'RSA',
          success: ()  => resolve(),
          fail: res => reject()
        })
        break;
      case AllPlatformType.H5:
        break;
      case AllPlatformType.TT:
        break;
    }
  })
}

export default tradePay
