/**
 * 订单项组件
 */
import {Image, View} from "@tarojs/components";
import {ITouchEvent} from "@tarojs/components/types/common";
import taro from "@tarojs/taro";
import {useState} from "preact/hooks";
import * as React from "react";
import Point from "../../../components/Point";
import {targetAddressPointColor, warningColor} from "../../../config/globalConfig";
import {convertDate} from "../../../util/Carlendar";
// @ts-ignore
import style from "./style.module.scss"
import {OrderCategoryType} from "../index";
import Icon from "../../../components/Icon";
import {navigateStoreDetail, navigateToHome, navigateToOrderDetailPage} from "../../../store/module/router";
import {getOrderById, getOrders, tradeOverTimeOrderById} from "../../../api/order";
import tradePay from "../../../nativeInterface/tradePay";
import {getStatusMapInfo, useRebook} from "../../../util/orderUtil";
import OrderRemark from "./OrderRemark";

type OrderContainerPropsType = {
  data: OrderItemType
  orderCategory:OrderCategoryType
  onCancel: (value: OrderItemType) => void
  onReturnCar: (value: OrderItemType) => void
  onComment: (value: OrderItemType) => void
  onPayOverTimeFeeAndReturnCared: (value: OrderItemType) => void
  onPayed: (value: OrderItemType) => void
}
const OrderItem:React.FC<OrderContainerPropsType> = props => {
  const payStatus: OrderStatus[] = [
    'CREDITING',
    'PAYING'
  ]
  const {cover} = props.data
  const {data} = props
  const starDate = new Date(data.startTimeStamp)
  const endDate = new Date(data.endTimeStamp)
  const days = (data.endTimeStamp - data.startTimeStamp) / (60 * 60 * 24 * 1000)
  const pointSize: number = 2;
  const tradeNo = data.alipayTradeNo;
  const handleCopy = async (e: ITouchEvent) => {
    await taro.setClipboardData({ data: tradeNo })
    await taro.showToast({title: '订单号复制成功', duration: 5000})
    e.stopPropagation()
  }
  const handleReturnCar = async () => {
    const order = await getOrderById(props.data.id)
    if (order.expiredFee > 0) {
      const res = await taro.showModal({
        title: `您已超时用车${props.data.expiredDays.toFixed(1)}天, 需补交${props.data.expiredFee.toFixed(2)}元, 是否补交并还车?`
      })
      const overtimeTradeNo = await tradeOverTimeOrderById(order.id)
      res.confirm && await tradePay(overtimeTradeNo)
      props.onPayOverTimeFeeAndReturnCared(props.data)
    } else {
      const res = await taro.showModal({
        title: '您确定要还车吗？'
      })
      res.confirm && props.onReturnCar(props.data)
    }
  }
  const handleRebook = useRebook()
  const handlePay = async () => {

    props.onPayed(props.data)
  }

  return (
    <>
      <View className={style.main}>
        <View className={style.headerWrapper}>
          <View className={style.status}>{
            getStatusMapInfo(data)
          }</View>
          <View>￥{props.data.amount}</View>
        </View>
        <View className={style.orderNo} onClick={handleCopy}>
          <View>订单号: {props.data.outTradeNo}</View><Icon className={style.copyIcon} value='copy' />
        </View>
        <View className={style.name}>{props.data.title}</View>
        <View className={style.storeWrapper}>
          <View className={style.storeAddressWrapper}>
            <View className={style.pointWrapper}>
              <Point color={warningColor} borderSize={pointSize} />
              <View className={style.line} />
              <Point color={targetAddressPointColor} borderSize={pointSize} />
            </View>
            <View className={style.storeAddress}>
              <View>{data.startStore.city.name} {data.startStore.name}</View>
              <View>{data.endStore.city.name} {data.endStore.name}</View>
            </View>
          </View>
          <View className={style.imageWrapper}>
            <Image src={cover} className={style.image} />
          </View>
        </View>
        <View className={style.dateWrapper}>
          <View>{convertDate(starDate)}</View>
          <View className={style.durationWrapper}>
            <View className={style.backgroundLine} />
            {days.toFixed(1)}天
            <View className={style.backgroundLine} />
          </View>
          <View>{convertDate(endDate)}</View>
        </View>
        {
          !!props.data.remark && (
            <View className={style.remarkWrapper}>
              <View>备注:</View>
              <View>{props.data.remark}</View>
            </View>
          )
        }
        <View className={style.buttonWrapper}>
          {
            ['USING', 'OVERTIME'].includes(props.data.status )  && (
              <View className={style.button} onClick={handleReturnCar}>还车</View>
            )
          }
          {
            payStatus.includes(props.data.status ) && (
              <View className={style.button}
                onClick={handlePay}
              >支 付</View>
            )
          }
          {/*{*/}
          {/*  props.data.status === 'OVERTIME' && (*/}
          {/*    <View className={style.button}>超时续约</View>*/}
          {/*  )*/}
          {/*}*/}
          {
            [
              'FINISHED', // 已完成
              'CANCELED' // 已取消
            ].includes(props.data.status) && (
              <View className={style.button} onClick={() => handleRebook(props.data)} >
                再次预订
              </View>
            )
          }
          {
            ['FINISHED'].includes(props.data.status) && !props.data.comment && (
              <View className={style.button} onClick={() => props.onComment(props.data)}>评价</View>
            )
          }
          {
            props.data.status === 'CAR_PICKUP_IN_PROGRESS' && (
              <>
                <View className={style.button}
                  onClick={() => props.onCancel(props.data)}
                >
                  取消订单
                </View>
              </>
            )
          }
          <View className={style.button} onClick={() => navigateToOrderDetailPage(data.id)} > 详情 </View>

        </View>
        <OrderRemark order={data} />

      </View>
    </>
  )
}

export default OrderItem;
