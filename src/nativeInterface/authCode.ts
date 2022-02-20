import BaseError, {ErrorTypes} from "../errors/BaseError";
// @ts-ignore
import Taro from "@tarojs/taro"
import {alipay, weapp} from "./base";

const authCode = (): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    switch (process.env.TARO_ENV) {
      case alipay:
        my.getAuthCode({
          scopes: 'auth_base',
          success: ({authCode}) => resolve(authCode as string),
          fail: () => reject(new BaseError({errorType: ErrorTypes.USER_AUTH_REJECT, message: 'User refusal to authorize.'}))
        })
        break;

      case weapp:
        Taro.login({
          success: (res) => res.code ?
            resolve(res.code) :
            reject(new BaseError({errorType: ErrorTypes.USER_AUTH_REJECT, message: res.errMsg}))
        })
        break;

      default:
        return reject("This function must be used in mini program environment.");
    }

  })
}

export default authCode;
