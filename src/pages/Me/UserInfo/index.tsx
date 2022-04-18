import {Image, View} from "@tarojs/components";
import * as React from "react";
import {navigateToLoginOrRegister} from "../../../store/module/router";
// @ts-ignore
import style from "./style.module.scss"
import {replaceStr} from "../../../util/helper";
import {useAppSelector} from "../../../reduxStore";
import {useIsLogin} from "../../../util/authUtilHook";

const UserInfo: React.FC = ()=> {
  const handleLogin = (): void => navigateToLoginOrRegister()
  const meData = useAppSelector(state => state.me.data)
  const isLogin = useIsLogin()
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
      {
        isLogin && (
          <View className={style.userInfoWrapper}>
            <Image
              src={meData.avatar}
              className={style.image}
            />
            <View className={style.userInfo}>
              <View>{meData.nickName || '匿名用户'}</View>
              { meData.phone && <View>{replaceStr(meData.phone, 3, 4, '*')}</View> }
            </View>
          </View>
        )
      }
    </View>
  )
}

export default UserInfo
