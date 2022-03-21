import {Button, Image, View} from "@tarojs/components";
import * as React from "react";
import {useReducer} from "react";
// @ts-ignore
import style from "./style.module.scss"
// @ts-ignore
import carSvg from "../../../asesst/images/undraw_by_my_car_ttge.svg";
import getPlatformType, {AllPlatformType} from "../../../util/platformType";
import Agreement from "../../../components/Agreement";
import {goToSwitchTab, navigateTo, navigateToPhoneLoginPage} from "../../../store/module/router";
import * as Taro from "@tarojs/taro";
import {uploadUserInfoThunk} from "../../../store/module/me";
import {store} from "../../../store";

const Login = (): React.ReactElement => {
  const [agreement, dispatch] = useReducer((state): boolean => !state, false)
  const handleLoginOrRegister = () => navigateToPhoneLoginPage()
  let platform: string;
  if (getPlatformType() ===  AllPlatformType.ALIPAY ) platform = '支付宝'
  if (getPlatformType() ===  AllPlatformType.WECHAT) platform = '微信'
  const handleMessage = () => {
    setTimeout(() => {
      store.message.next({
        title: '登录成功 🎉 🎉 🎉',
        type: 'info',
        duration: 5000
      })
    }, 500)
  }
  const handleUploadUserInfo = (): void => {
    Taro.showLoading({title: '登录中...'})
    uploadUserInfoThunk().then(() => {
      handleMessage()
      Taro.hideLoading()
      goToSwitchTab()
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
        onGetAuthorize={handleUploadUserInfo}
        className={style.directLogin}
      >{platform}账号一键登录</Button>

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
