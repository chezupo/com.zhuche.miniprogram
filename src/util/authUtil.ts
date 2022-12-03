import * as Taro from "@tarojs/taro";
import taro from "@tarojs/taro";
import {AccessTokenType} from "../store/module/me";
import store from "../reduxStore";

const tokenKey = "token";

export const hasLogin = (): Promise<AccessTokenType> => {
  return new Promise<AccessTokenType>((resolve, reject) => {
    Taro.getStorage({
      key: tokenKey
    }).then(res => {
      const accessToken = JSON.parse(res.data as string) as AccessTokenType
      if (accessToken.expiration < Date.now()) return reject()
      resolve(accessToken)
    }).catch(err => {
      reject()
    })
  })
}

const setToken = (token: string) => {
  taro.setStorageSync(tokenKey, token)
}

const getToken = (): string => {
  try {
    const res = taro.getStorageSync(tokenKey)
    return res
  }catch (e) {
    return '';
  }
}

const isLogin = (): boolean => {
  return !!store.getState().me?.data?.isAuthorizeBaseInfo
}

export {isLogin, setToken, getToken}
