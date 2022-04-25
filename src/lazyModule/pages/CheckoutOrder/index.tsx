import React from 'react'
import taro from "@tarojs/taro";
import {useEffect, useState} from "preact/hooks";
import {View} from "@tarojs/components";
import Car from "./Car/Car";
import Insurance from "./Insurance";
import CheckRender from "./CheckRender";
import Coupon from "./Coupon";
import {useAppSelector} from "../../../reduxStore";
import MenuContainer from "../../../components/MenuContainer";
import MenuRender, {AmountListType} from "./MenuRender";
import DepositRender from "./DepositRender";
// @ts-ignore
import style from "./style.module.scss"
import Message from "../../../components/Message";
import {createOrder} from "../../../api/order";
import tradePay from "../../../nativeInterface/tradePay";
import {navigateToOrder} from "../../../store/module/router";
import RemarkRender from "./MarkRender";
import OrderAgreement from "./OrderAgreement";

const Order: React.FC = () => {
  const {
    userCoupon,
    car,
    startStore,
    isForeignCity,
    endStore,
    starTime,
    endTime
  } = useAppSelector(state => state.order.createOrder)
  const [allowed, setAllowed] = useState<boolean>(false)
  useEffect(() => {console.log(allowed)},  [allowed])
  const [isInsuranceFee, setIsInsuranceFee] = useState<boolean>(false) // 是否启用驾无忧保险
  const [amountList, setAmountList] = useState<AmountListType>({
    insuranceFee: 0,
    rent: 0,
    deposit: 0,
    handlingFee: 0,
    waiverHandlingFee: 0,
    waiverRent: 0
  })
  const days = (endTime - starTime) / (60 * 60 * 24 * 1000) // 天数
  const insuranceFeeDays = Math.ceil(days); // 驾无忧按一整天算
  /**
   * 计算金额
   */
  const handleInitAmountList = () => {
    let rent = car.rent * days
    let {handlingFee} = car // 手续费
    const {deposit} = car // 押金
    const insuranceFee: number = isInsuranceFee ? car.insuranceFee * insuranceFeeDays : 0
    let waiverHandlingFee: number = 0
    let waiverRent: number = 0
    if (userCoupon && userCoupon.isValid && rent + handlingFee + insuranceFee >= userCoupon.meetAmount && userCoupon.amount > 0) {
      let userCouponAmount = userCoupon.amount
      // 先减免手续费
      if (handlingFee > userCouponAmount) {
        handlingFee = handlingFee - userCouponAmount
        waiverHandlingFee = userCouponAmount
        userCouponAmount = 0
      } else {
        userCouponAmount = userCouponAmount - handlingFee
        waiverHandlingFee = handlingFee
        handlingFee = 0
      }
      // 减免租金
      if (userCouponAmount > 0) {
        if (rent > userCouponAmount) {
          rent = rent - userCouponAmount
          waiverRent = userCouponAmount
        } else {
          waiverRent = rent
          rent = 0
        }
      }
    }
    setAmountList({ rent, handlingFee, deposit, insuranceFee, waiverRent, waiverHandlingFee})
  }
  useEffect(() => handleInitAmountList(), [car, starTime, endTime, userCoupon, isInsuranceFee, userCoupon])
  useEffect(() => handleInitAmountList(), [])
  const [remark, setRemark] = useState<string>('')
  const handleSubmit = () => {
    const p = async (): Promise<void> => {
      if (!allowed) {
        await taro.showToast({title: '请同意协议'})
        return
      }
      await taro.showLoading({title: '创建中...'})
      try {
        const newOrder = await createOrder({
          remark,
          carId: car.id,
          endStoreId: isForeignCity ? endStore.id : startStore.id,
          startStoreId: startStore.id,
          isInsurance: isInsuranceFee,
          startTimeStamp: starTime,
          endTimeStamp: endTime,
          ...(userCoupon ? {userCouponId: userCoupon.id} : {})
        })
        await tradePay(newOrder.alipayTradeNo)
        navigateToOrder()
      } finally {
        await taro.hideLoading()
      }
    }
    p().then(() => {
      console.log("Success submit.")
    }).catch(e => {
      debugger
    })
  }

  const menuRender = (<MenuRender
    onSubmit={handleSubmit}
    amountList={amountList}
    allowed={allowed}
  />)

  return (
    <>
      <Message style={{zIndex: 3}} />
      <View className={style.main}>
        <MenuContainer
          menuBar={menuRender}
          bodyHeight={88}
        >
          <View className={[style.container, style.carContainer].join(' ')}>
            <Car
              data={car}
              startStore={startStore}
              endStore={isForeignCity ? endStore : startStore}
              startTime={starTime}
              endTime={endTime}
            />
          </View>
          <View className={style.container}>
            <Insurance
              insuranceFee={car.insuranceFee}
              days={insuranceFeeDays}
              checked={isInsuranceFee}
              onChange={setIsInsuranceFee}
            />
            <Coupon checkedCoupon={userCoupon} amountList={amountList} />
            <DepositRender />
            <RemarkRender value={remark} onChange={setRemark} />
            <OrderAgreement />
            <CheckRender
              checked={allowed}
              onChange={() => {
                setAllowed(() => !allowed)
              }}
            />
          </View>
        </MenuContainer>
      </View>
    </>
  )
}

export default Order
