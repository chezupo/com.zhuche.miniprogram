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
import {OrderItemType, OrderStatus} from "../../../typings";
import {convertDate} from "../../../util/Carlendar";
// @ts-ignore
import style from "./style.module.scss"
import {OrderCategoryType} from "../index";
import Icon from "../../../components/Icon";
import {navigateStoreDetail} from "../../../store/module/router";

type OrderContainerPropsType = {
  data: OrderItemType
  orderCategory:OrderCategoryType
}
const OrderItem:React.FC<OrderContainerPropsType> = props => {
  const statusMapChinese: Record<OrderStatus, {title: string; notice?: string}> = {
    CREDITING: {title: '信用授权中', notice: ''},
    PAYING: {title: '待支付', notice: ''},
    CAR_PICKUP_IN_PROGRESS: {title: '取车中', notice: '请到门店提取您预定的汽车'},
    USING: {title: '使用中', notice: ''},
    OVERTIME: {title: '用车超时', notice: ''},
    RETURNING: {title: '还车中', notice: ''},
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
  const [notice, setNotice] = useState<string>('')
  const handlePay = () => {

  }
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

  return (
    <View className={style.main}>
      <View className={style.headerWrapper}>
        <View className={style.status}>{statusMapChinese[data.status].title}</View>
        <View>￥{props.data.amount}</View>
      </View>
      <View className={style.orderNo} onClick={handleCopy}>
        <View>订单号: {tradeNo}</View><Icon className={style.copyIcon} value='copy' />
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
          {days}天
          <View className={style.backgroundLine} />
        </View>
        <View>{convertDate(endDate)}</View>
      </View>
      <View className={style.buttonWrapper}>
        {
          payStatus.includes(props.data.status ) && (
            <View className={style.button}>支 付</View>
          )
        }
        {
          props.data.status === 'OVERTIME' && (
            <View className={style.button}>超时续约</View>
          )
        }
        {
          bookAgainStatus.includes(props.data.status) && (
            <>
              <View className={style.button}>
                再次预订
              </View>
              <View className={style.button}>
                评价
              </View>
            </>
          )
        }
        {
          props.data.status === 'CAR_PICKUP_IN_PROGRESS' && (
            <>
              <View className={style.button}>
                取消订单
              </View>
              <View
                className={style.button}
                onClick={handleShowStoreDetail}
              >
                联系门店
              </View>
            </>
          )
        }
      </View>
      {
        statusMapChinese[data.status].notice && (
          <View className={style.notice}>{statusMapChinese[data.status].notice}</View>
        )
      }
    </View>
  )
}

export default OrderItem;
