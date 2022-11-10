import Taro from "@tarojs/taro"
import BaseError, {ErrorTypes} from "../errors/BaseError";
// @ts-ignore
import {alipay, weapp} from "./base";
import {AllPlatformType} from "../util/platformType";
import {differenceBy} from "lodash";

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
          success: (res) => {
            if(res.code) {
              resolve(res.code);
            } else {
              reject(new BaseError({errorType: ErrorTypes.USER_AUTH_REJECT, message: res.errMsg}));
            }
          },
          fail: (res) => {
            return reject(res);
          }

        })
        break;
      case AllPlatformType.TT:
        Taro.login()
          .then(res => {
            res.code ? resolve(res.code) : reject(new BaseError({errorType: ErrorTypes.USER_AUTH_REJECT, message: res.errMsg}))
        })
        break;

      default:
        return reject("This function must be used in mini program environment.");
    }

  })
}

export default authCode;
