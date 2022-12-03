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
      // @ts-ignore
      my.getOpenUserInfo({
        fail: (res) => {
            return reject(res)
          },
          success: (res) => {
            let userInfo = JSON.parse(res.response).response as UserInfoType
            return resolve(userInfo)
          }
      })
    } else if (getPlatformType() === AllPlatformType.WECHAT) {
      Taro.getUserInfo({
        success: (res) => {
          const userInfo: UserInfoType = {
            avatar: res.userInfo.avatarUrl,
            city: res.userInfo.city,
            code: '',
            countryCode: res.userInfo.country,
            gender: res.userInfo.gender + '',
            nickName: res.userInfo.nickName,
            province: res.userInfo.province,
          };
          return resolve(userInfo)
        },
        fail: (res) => reject(res)
      })
    } else {
      return reject(Error('No suitable platform found.'))
    }
  })
}
