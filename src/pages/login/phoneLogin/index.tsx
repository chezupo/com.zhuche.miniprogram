import {Image, Input, View} from "@tarojs/components";
import * as React from "react";
import {useReducer} from "react";
// @ts-ignore
import style from "./style.module.scss";
import Agreement from "../../../components/Agreement";

const PhoneLogin = (): React.ReactElement => {
  const [agreement, dispatcher] = useReducer((state: boolean): boolean => {
    return !state
  }, false)

  const logo: string = 'https://zhuche-a1001.qiniu.wuchuheng.com/logo.png';
  return (<View className={style.main}>
    <Image src={logo} className={style.logo} />
    <View className={style.formWrapper}>
      <View className={style.phoneInputWrapper}>
        <View className={['icon icon-user', style.icon].join(' ')} />
        <Input type='number' className={style.input}  placeholder='请输入手机号' />
      </View>

      <View className={style.codeWrapper}>
        <View className={style.phoneInputWrapper}>
          <View className={['icon icon-password', style.icon].join(' ')} />
          <Input type='number' className={style.input} placeholder='请输入6位手机验证码' />
        </View>
        <View className={style.code}>获取验证码</View>
      </View>
    </View>

    <View className={style.loginButton}>登录</View>

    <View className={style.agreementWrapper}>
      <Agreement checked={agreement} onChange={dispatcher} />
    </View>

  </View>)
}

export default PhoneLogin
