import * as Taro from "@tarojs/taro";
import getPlatformType, {AllPlatformType} from "../util/platformType";

export type UserInfoType = {
  avatar: string
  city: string
  code: string
  countryCode: string
  gender: string
  nickName: string
  province: string
}
export const getUserProfile  = (): Promise<UserInfoType> => {
  return new Promise<UserInfoType>((resolve, reject) => {
    if (getPlatformType() === AllPlatformType.ALIPAY ) {
      my.getOpenUserInfo({
        fail: (res) => {
            return reject(res)
          },
          success: (res) => {
            let userInfo = JSON.parse(res.response).response as UserInfoType
            return resolve(userInfo)
          }
      })
    } else {
      Taro.getUserProfile({
        desc: "您正在登录车租车应用",
        success: res => {
          debugger
          return resolve(res)
        },
        fail: res => {
          debugger

          return reject(res)
        }
      })
    }
  })
}
