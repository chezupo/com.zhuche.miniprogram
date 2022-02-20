import {View} from "@tarojs/components";
import {AtAvatar} from "taro-ui";
import * as React from "react";
import {navigateTo} from "../../../store/module/router";
import useObserve from "../../../util/useObserve";
import {isLoginObserve} from "../../../store/module/me";
// @ts-ignore
import style from "./style.module.scss"
import {replaceStr} from "../../../util/helper";

const UserInfo = (): React.ReactElement => {
  const handleLogin = (): void => navigateTo('/pages/login/index')
  const [isLogin, isLoginDispatcher] = useObserve(isLoginObserve)
  const coverImage: string = '';
  return (
    <View className={style.main}>
      {
        !isLogin &&
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
        />
        <View className={style.userInfo}>
          <View>张四</View>
          <View>{replaceStr('13427898987', 3, 4, '*')}</View>
        </View>
      </View>
    </View>
  )
}

export default UserInfo
