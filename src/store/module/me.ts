import SubscriptionBuilder from "../../util/SubscriptionBuilder";
import getPlatformType, {AllPlatformType} from "../../util/platformType";
import authCode from "../../nativeInterface/authCode";
import {authorize} from "../../api/authoriztion";
import {hasLogin, saveAccessToken} from "../../util/auth";
import * as Taro from "@tarojs/taro";
import {getUserProfile} from "../../nativeInterface/getUserProfile";

export type MeType = {
  id: number
  userName: string
  isLogin: boolean
}
export type AccessTokenType = {
  accessToken: string
  expiration: number
  tokenType: string
  isNewUser: boolean
}
const initUser: MeType & AccessTokenType = {
  id: 0,
  isLogin: false,
  userName: '' ,
  accessToken: '',
  expiration: 0,
  tokenType: '',
  isNewUser: false
}

export const isLoginObserve: SubscriptionBuilder<boolean> = new SubscriptionBuilder<boolean>(false)
export const meObserve: SubscriptionBuilder<MeType & AccessTokenType> = SubscriptionBuilder.initCallBack<MeType & AccessTokenType>(initUser, async () => {
  try{
    const accessToken = await hasLogin();
    return {
      ...initUser,
      isLogin: true,
      ...accessToken
    }
  }catch (e) {
    return initUser
  }
})

// 登录
export const loginThunk = async (): Promise<void> => {
  if (AllPlatformType.ALIPAY === getPlatformType()) {
    const code = await authCode()
    const {isNewUser, accessToken} = await authorize(code)
    meObserve.next( {...meObserve.value, isNewUser, accessToken})
  }
}
