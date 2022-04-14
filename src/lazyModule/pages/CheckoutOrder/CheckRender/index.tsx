import React from "react";
import taro from "@tarojs/taro";
import {Checkbox, Text, View} from "@tarojs/components";
import {primaryThemeColor} from "../../../../global";
import config from '../Agreements/index.config'
// @ts-ignore
import style from './style.module.scss'
import {useAppSelector} from "../../../../reduxStore";
import {navigateToCheckoutOrderAgreement} from "../../../../store/module/router";

const CheckRender: React.FC = () => {
  const {servicePhone} = useAppSelector(state => state.configuration.config)
  const handleCallPhone = () => {
    taro.makePhoneCall({phoneNumber: servicePhone})
  }
  const handleShowCheckoutOrderAgreement = () => {
    navigateToCheckoutOrderAgreement()
  }

  return (<>
    <View className={style.itemWrapper}>
      <Checkbox value='hello' color={primaryThemeColor} />
      <View
        className={style.titleWrapper}
        onClick={handleShowCheckoutOrderAgreement}
      >
        已阅读并同意<Text className={style.title}>《{config.navigationBarTitleText}》</Text>
      </View>
    </View>
    <View className={style.servicePhoneWrapper}>
      <View className={style.container} onClick={handleCallPhone}>
        客服热线: <Text className={style.servicePhone}>{servicePhone}</Text>
      </View>
    </View>
  </>)
}

export default CheckRender
