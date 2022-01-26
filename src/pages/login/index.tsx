import {Image, View} from "@tarojs/components";
import * as React from "react";
import {useReducer} from "react";
// @ts-ignore
import style from "./style.module.scss"
// @ts-ignore
import carSvg from "../../asesst/images/undraw_by_my_car_ttge.svg";
import getPlatformType, {AllPlatformType} from "../../util/platformType";
import Agreement from "../../components/Agreement";
import {navigateTo} from "../../store/router";

const Login = (): React.ReactElement => {
  const [agreement, dispatch] = useReducer((state): boolean => !state, false)
  const handleLoginOrRegister = () => navigateTo('/pages/login/phoneLogin/index')
  let platform: string;
  if (getPlatformType() ===  AllPlatformType.ALIPAY ) platform = '支付宝'
  if (getPlatformType() ===  AllPlatformType.WECHAT) platform = '微信'

  return (
    <View className={style.main}>
      <Image
        src={carSvg}
        className={style.image}
      />
      <View className={style.directLogin}>{platform}账号一键登录</View>
      <View
        className={style.phoneLoginOrRegister}
        onClick={handleLoginOrRegister}
      >手机号登录/注册</View>
      <View className={style.agreementWrapper}>
        <Agreement checked={agreement} onChange={dispatch} />
      </View>
    </View>
  )

}

export default Login

