import {Text, View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import Taro from "@tarojs/taro";
// @ts-ignore
import style from "./style.module.scss";
import useObserve from "../../util/useObserve";
import {useAppStoreSelector} from "../../store";
import {useAppSelector} from "../../reduxStore";

const Customer = (): React.ReactElement => {
  const {servicePhone} = useAppSelector(state => state.configuration.config)
  const handleCall = (): void => {
    Taro.makePhoneCall({ phoneNumber: servicePhone}) .then(() => console.log("Call phone success."))
  }

  return (
    <View
      className={style.main}
      onClick={handleCall}
    >
      客服热线: <Text className={style.phone}>{servicePhone}</Text>
    </View>
  )
}

export default Customer
