import {View} from "@tarojs/components";
import {AtAvatar} from "taro-ui";
import * as React from "react";
import {navigateTo} from "../../../store/module/router";
import useObserve from "../../../util/useObserve";
import {isLoginObserve} from "../../../store/module/me";
// @ts-ignore
import style from "./style.module.scss"
import {replaceStr} from "../../../util/helper";
import {useAppStoreSelector} from "../../../store";

const UserInfo: React.FC = ()=> {
  const handleLogin = (): void => navigateTo('/pages/login/index')
  const [me] = useObserve(useAppStoreSelector().me)
  return (
    <View className={style.main}>
      {
        me.isNewUser &&
        <View className={style.loginWrapper}>
          <View
            className={style.loginButton}
            onClick={handleLogin}
          >登录/注册</View>
        </View>
      }
      <View className={style.userInfoWrapper}>
        <AtAvatar
          text='车'
          circle
          size='large'
          {...(me.avatar ? {image: me.avatar} : {})}
        />
        <View className={style.userInfo}>
          <View>{me.nickName}</View>
          { me.phone && <View>{replaceStr(me.phone, 3, 4, '*')}</View> }
        </View>
      </View>
    </View>
  )
}

export default UserInfo
