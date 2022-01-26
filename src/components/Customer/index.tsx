import {Text, View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import Taro from "@tarojs/taro";
// @ts-ignore
import style from "./style.module.scss";

const Customer = (): React.ReactElement => {
  const phone: string = '400-400-400'
  const handleCall = (): void => Taro.makePhoneCall({ phoneNumber: phone })

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
