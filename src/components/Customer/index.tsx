import {Text, View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import Taro from "@tarojs/taro";
// @ts-ignore
import style from "./style.module.scss";
import useObserve from "../../util/useObserve";
import {useAppStoreSelector} from "../../store";

const Customer = (): React.ReactElement => {
  const [{servicePhone: phone}] = useObserve(useAppStoreSelector().commonData)
  const handleCall = (): void => {
    Taro.makePhoneCall({ phoneNumber: phone }) .then(() => console.log("Call phone success."))
  }

  return (
    <View
      className={style.main}
      onClick={handleCall}
    >
      客服热线: <Text className={style.phone}>{phone}</Text>
    </View>
  )
}

export default Customer
