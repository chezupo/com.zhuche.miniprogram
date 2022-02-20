import * as Taro from "@tarojs/taro";
import {UserInfo} from "@tarojs/taro";
import getPlatformType, {AllPlatformType} from "../util/platformType";

interface SuccessCallbackResult extends TaroGeneral.CallbackResult {
  /** 敏感数据对应的云 ID，开通[云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)的小程序才会返回，可通过云调用直接获取开放数据，详细见[云调用直接获取开放数据](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html#method-cloud) */
  cloudID?: string
  /** 包括敏感数据在内的完整用户信息的加密数据，详见 [用户数据的签名验证和加解密]((signature#加密数据解密算法)) */
  encryptedData: string
  /** 加密算法的初始向量，详见 [用户数据的签名验证和加解密]((signature#加密数据解密算法)) */
  iv: string
  /** 不包括敏感信息的原始数据字符串，用于计算签名 */
  rawData: string
  /** 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息，详见 [用户数据的签名验证和加解密](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/signature.html) */
  signature: string
  /** 用户信息对象，不包含 openid 等敏感信息 */
  userInfo: UserInfo
  /** 调用结果 */
  errMsg: string
}
export const getUserProfile  = (): Promise<SuccessCallbackResult> => {
  return new Promise<SuccessCallbackResult>((resolve, reject) => {
    if (getPlatformType() === AllPlatformType.ALIPAY ) {
      my.getOpenUserInfo({
        fail: (res) => {
          debugger
        },
        success: (res) => {
          debugger
          let userInfo = JSON.parse(res.response).response // 以下方的报文格式解析两层 response
        }
      });

    } else {
      Taro.getUserProfile({
        desc: "您正在登录车租车应用",
        success: res => resolve(res),
        fail: e => reject(e)
      })
    }
  })
}
