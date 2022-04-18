import SubscriptionBuilder from "../../util/SubscriptionBuilder";
import {hasLogin} from "../../util/authUtil";
import {store} from "../index";
import {UserInfoType} from "../../nativeInterface/getUserProfile";

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

