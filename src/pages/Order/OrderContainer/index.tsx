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
import {navigateStoreDetail, navigateToHome} from "../../../store/module/router";
import {getOrderById, getOrders, tradeOverTimeOrderById} from "../../../api/order";
import tradePay from "../../../nativeInterface/tradePay";

type OrderContainerPropsType = {
  data: OrderItemType
  orderCategory:OrderCategoryType
  onCancel: (value: OrderItemType) => void
  onReturnCar: (value: OrderItemType) => void
  onComment: (value: OrderItemType) => void
  onPayOverTimeFeeAndReturnCared: (value: OrderItemType) => void
}
const OrderItem:React.FC<OrderContainerPropsType> = props => {
  const statusMapChinese: Record<OrderStatus, {title: string; notice?: string}> = {
    CREDITING: {title: '信用授权中', notice: ''},
    PAYING: {title: '待支付', notice: ''},
    CAR_PICKUP_IN_PROGRESS: {title: '取车中', notice: '请到门店提取您预定的汽车'},
    USING: {title: '使用中', notice: ''},
    OVERTIME: {title: '用车超时', notice: `您已用车超时${props.data.expiredDays?.toFixed(1)}天，还车时还需另外补交超时费用: ${props.data.expiredFee?.toFixed(2)}`},
    RETURNING: {title: '还车中', notice: `请把车开到${props.data.endStore.name}，完成还车`},
    RENEWED: {title: '已续约', notice: ''},
    FINISHED: {title: '已完成', notice: ''},
    CANCELED: {title:'已取消', notice: '' }
  }
  const payStatus: OrderStatus[] = [
    'CREDITING',
    'PAYING'
  ]
  const bookAgainStatus: OrderStatus[] = [
    'FINISHED',
    'RENEWED',
    'CANCELED',
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
  const handleShowStoreDetail = () => {
    navigateStoreDetail(props.data.startStore.id, true)
  }
  const handleGoToEndStore = () => {
    navigateStoreDetail(props.data.endStore.id, true)
  }
  const handleReturnCar = async () => {
    const order = await getOrderById(props.data.id)
    await taro.showLoading({
      title: '还车中...'
    })
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
    await taro.hideLoading()
  }
  const handleReservation = () => {
    navigateToHome();
  }

  return (
    <>
      <View className={style.main}>
        <View className={style.headerWrapper}>
          <View className={style.status}>{statusMapChinese[data.status].title}</View>
          <View>￥{props.data.amount}</View>
        </View>
        <View className={style.orderNo} onClick={handleCopy}>
          <View>订单号: {props.data.alipayOutTradeNo}</View><Icon className={style.copyIcon} value='copy' />
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
              <View className={style.button}>支 付</View>
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
              <View
                className={style.button}
                onClick={handleReservation}
              >
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
                <View
                  className={style.button}
                  onClick={handleShowStoreDetail}
                >
                  取车门店
                </View>
              </>
            )
          }
          {
            props.data.status === 'RETURNING' && (
              <View
                className={style.button}
                onClick={handleGoToEndStore}
              >
                还车门店
              </View>
            )
          }
        </View>
        {
          statusMapChinese[data.status].notice && (
            <View className={style.notice}>{statusMapChinese[data.status].notice}</View>
          )
        }
      </View>
    </>
  )
}

export default OrderItem;
