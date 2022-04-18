import React from 'react'
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import Car from "./Car/Car";
import Insurance from "./Insurance";
import OrderAgreement from "./OrderAgreement";
import CheckRender from "./CheckRender";
import Coupon from "./Coupon";
import {useAppSelector} from "../../../reduxStore";

const Order: React.FC = () => {
  const userCoupon = useAppSelector(state => state.order.createOrder.userCoupon)
  return (
    <View className={style.main}>
      <View className={style.container}>
        <Car />
        <Insurance />
        <Coupon checkedCoupon={userCoupon} />
        <OrderAgreement />
        <CheckRender />
      </View>
      <View>
      </View>
    </View>
  )
}

export default Order
