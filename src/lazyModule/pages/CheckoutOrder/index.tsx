import React from 'react'
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import Car from "./Car/Car";
import Insurance from "./Insurance";
import OrderAgreement from "./OrderAgreement";
import CheckRender from "./CheckRender";

const Order: React.FC = () => {
  return (
    <View className={style.main}>
      <View className={style.container}>
        <Car />
        <Insurance />
        <OrderAgreement />
        <CheckRender />
      </View>
      <View>
      </View>
    </View>
  )
}

export default Order
