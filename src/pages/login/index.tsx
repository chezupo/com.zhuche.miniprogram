import {Button, Image, View} from "@tarojs/components";
import * as React from "react";
import {useEffect, useReducer} from "react";
// @ts-ignore
import style from "./style.module.scss"
// @ts-ignore
import carSvg from "../../asesst/images/undraw_by_my_car_ttge.svg";
import getPlatformType, {AllPlatformType} from "../../util/platformType";
import Agreement from "../../components/Agreement";
import {navigateTo} from "../../store/module/router";
import Taro from "@tarojs/taro"
import {loginThunk} from "../../store/module/me";
import authCode from "../../nativeInterface/authCode";

const Login = (): React.ReactElement => {
  const [agreement, dispatch] = useReducer((state): boolean => !state, false)
  const handleLoginOrRegister = () => navigateTo('/pages/login/phoneLogin/index')
  let platform: string;
  if (getPlatformType() ===  AllPlatformType.ALIPAY ) platform = '支付宝'
  if (getPlatformType() ===  AllPlatformType.WECHAT) platform = '微信'
  const handleLogin = (): void => {
    Taro.showLoading("登录中...")
    loginThunk().then(() => {
      Taro.hideLoading()
    }).catch(() => {
      Taro.hideLoading()
    })
  }

  return (
      <View className={style.main}>
      <Image
        src={carSvg}
        className={style.image}
      />
      <Button
        openType='getAuthorize'
        scope='userInfo'
        onGetAuthorize={handleLogin}
        className={style.directLogin}
      >{platform}账号一键登录</Button>
        <View
          onClick={handleLogin}
          className={style.directLogin}
        >{platform}tmp</View>
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
