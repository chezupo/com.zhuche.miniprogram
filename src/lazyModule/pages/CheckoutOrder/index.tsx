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
import MenuContainer from "../../../components/MenuContainer";
import MenuRender from "./MenuRender";
import DepositRender from "./DepositRender";

const Order: React.FC = () => {
  const userCoupon = useAppSelector(state => state.order.createOrder.userCoupon)
  return (
    <View className={style.main}>
      <MenuContainer
        menuBar={<MenuRender />}
        bodyHeight={88}
      >

        <View className={[style.container, style.carContainer].join(' ')}>
          <Car />
        </View>
        <View className={style.container}>
          <Insurance />
          <Coupon checkedCoupon={userCoupon} />
          <DepositRender />
          <OrderAgreement />
          <CheckRender />
        </View>
      </MenuContainer>
    </View>
  )
}

export default Order
