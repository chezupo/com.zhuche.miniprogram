import * as Taro from "@tarojs/taro";
import {AccessTokenType} from "../store/module/me";

const saveKey = "auth";

export const hasLogin = (): Promise<AccessTokenType> => {
  return new Promise<AccessTokenType>((resolve, reject) => {
    Taro.getStorage({
      key: saveKey,
      success: res => {
        const accessToken = JSON.parse(res as string) as AccessTokenType
        if (accessToken.expiration < Date.now()) return reject()
        resolve(accessToken)
      },
      fail: () => reject()
    })
  })
}

export const saveAccessToken = (accessToken: AccessTokenType): void => {
  accessToken.expiration = Date.now() + accessToken.expiration
  Taro.setStorage({
    key: saveKey,
    data: JSON.stringify(accessToken)
  })
}
