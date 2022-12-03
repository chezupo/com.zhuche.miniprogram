import * as React from "react";
// @ts-ignore
import Taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import useObserve from "../../../util/useObserve";
import style from './style.module.scss'
import {useAppStoreSelector} from "../../../store";

const ServicePhone = (): React.ReactElement => {
  const [{servicePhone}] = useObserve(useAppStoreSelector().commonData)
  const handleCallServicePhone = (): void => {Taro.makePhoneCall({phoneNumber: servicePhone})}
  return (
    <View
      className={style.servicePhoneWrapper}
      onClick={handleCallServicePhone}
    >
      紧急问题可致电客服
      <Text className={style.servicePhone}>{servicePhone}</Text>
      获得帮助
    </View>

  )
}

export default ServicePhone
