import SubscriptionBuilder from "../../util/SubscriptionBuilder";
import getPlatformType, {AllPlatformType} from "../../util/platformType";
import authCode from "../../nativeInterface/authCode";
import {authorize} from "../../api/authoriztion";
import {hasLogin} from "../../util/auth";
import {store} from "../index";
import {getUserProfile, UserInfoType} from "../../nativeInterface/getUserProfile";
import {getMeInfo, updateMeInfo} from "../../api/me";

export type MeType = {
  id: number
  phone: string
} & AccessTokenType & UserInfoType
export type AccessTokenType = {
  accessToken: string
  isNewUser: boolean
}

const initUser: MeType = {
  id: 0,
  phone: '',
  nickName: '' ,
  accessToken: '',
  isNewUser: true,
  avatar: '',
  city:'',
  code:'',
  countryCode:'',
  gender:'',
  province:''
}

export const isLoginObserve: SubscriptionBuilder<boolean> = new SubscriptionBuilder<boolean>(false)
export const meObserve: SubscriptionBuilder<MeType> = SubscriptionBuilder.initCallBack<MeType>(initUser, async () => {
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
    store.me.next( {...store.me.value, isNewUser, accessToken})

    if (!isNewUser) {
      const newUserInfo = await getMeInfo()
      const newMe: MeType = {...store.me.value, ...newUserInfo}
      store.me.next(newMe)
    }
  }
}

// 上传用户信息
export const uploadUserInfoThunk = async (): Promise<void> => {
  let me: MeType = store.me.value
  if (!me.accessToken) {
    await loginThunk()
    me = store.me.value
  }
  const {avatar, nickName, city, code, countryCode, gender, province} = await getUserProfile()
  const res = await updateMeInfo({avatar, province, nickName, countryCode, code, gender, city})
  store.me.next({...me, ...res})
}

// 登出
export const logoutThunk = async (): Promise<void> => {
  store.me.next(initUser)
}
