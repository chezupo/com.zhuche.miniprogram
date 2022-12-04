import { Button, Image, View } from "@tarojs/components";
import * as Taro from "@tarojs/taro";
import * as React from "react";
import { useReducer } from "react";
import getPlatformType, { AllPlatformType } from "../../../util/platformType";
import Agreement from "../../../components/Agreement";
import { goToSwitchTab } from "../../../store/module/router";
import { store } from "../../../store";
import { useAppDispatch } from "../../../reduxStore";
import { uploadUserInfoThunk } from "../../../reduxStore/module/me";
import carSvg from "../../../asesst/images/undraw_by_my_car_ttge.svg";
import style from "./style.module.scss";

const Login = (): React.ReactElement => {
  const [agreement, agreementDispatch] = useReducer(
    (state): boolean => !state,
    false
  );
  let platform: string;
  if (getPlatformType() === AllPlatformType.ALIPAY) platform = "支付宝";
  if (getPlatformType() === AllPlatformType.WECHAT) platform = "微信";
  const handleMessage = () => {
    setTimeout(() => {
      store.message.next({
        title: "登录成功 🎉 🎉 🎉",
        type: "success",
        duration: 5000
      });
    }, 500);
  };
  const dispatch = useAppDispatch();
  const handleUploadUserInfo = async (): Promise<void> => {
    await Taro.showLoading({ title: "登录中..." });
    try {
      await dispatch(uploadUserInfoThunk());
      handleMessage();
      goToSwitchTab();
    } catch (e) {
    } finally {
      Taro.hideLoading();
    }
  };

  return (
    <View className={style.main}>
      <Image src={carSvg} className={style.image} />
      {/*支付宝调用*/}
      {getPlatformType() === AllPlatformType.ALIPAY && (
        <Button
          openType="getAuthorize"
          scope="userInfo"
          onGetAuthorize={handleUploadUserInfo}
          className={style.directLogin}
        >
          {platform}账号一键登录
        </Button>
      )}
      {/* 微信调用*/}
      {getPlatformType() === AllPlatformType.WECHAT && (
        <Button
          openType="getUserInfo"
          scope="userInfo"
          onGetUserInfo={handleUploadUserInfo}
          className={style.directLogin}
        >
          {platform}账号一键登录
        </Button>
      )}
      <View className={style.agreementWrapper}>
        <Agreement checked={agreement} onChange={agreementDispatch} />
      </View>
    </View>
  );
};

export default Login;
