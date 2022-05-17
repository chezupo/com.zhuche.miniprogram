import React, {useState} from "preact/compat";
import {useEffect} from "preact/hooks";
import taro from "@tarojs/taro";
import {Text, View} from "@tarojs/components";
import Card from "../components/Card";
// @ts-ignore
import style from './style.module.scss';
import Icon from "../../../../components/Icon";
import Button from "../../../../components/Button";
import {convertDate} from "../../../../util/Carlendar";
import AmountDetail from "../../CheckoutOrder/MenuRender/AmountDetail";
import {getDepositItems, useRebook} from "../../../../util/orderUtil";
import {PayNowItemType} from "../../CheckoutOrder/MenuRender";
import {setDetail} from "../../../../reduxStore/module/agreement";
import OrderRemark from "../../../../pages/Order/OrderContainer/OrderRemark";
import OrderItem from "../../PromotionPage/OrderItem";

export type OrderPropsType = {
  order: OrderItemType
}
type OrderCancelPropsType = {
  onCancelOrder: (order: OrderItemType) => void
}
const Transaction: React.FC<OrderPropsType & OrderCancelPropsType> = ({order, onCancelOrder}) => {
  const getOrderNo = (v: OrderItemType) => v.alipayTradeNo
  const getDays = (v: OrderItemType) => ((v.endTimeStamp - v.startTimeStamp) / (60 * 60 * 24 * 1000) ).toFixed(1)
  const handleCopy = async () => {
    await taro.setClipboardData({ data: getOrderNo(order)})
    await taro.showToast({title: '订单号复制成功', duration: 5000})
  }
  const [amountVisible, setAmountVisible] = useState<boolean>(false)
  useEffect(() => {
  }, [])
  const [payNowItems, setPayNowItems] = useState<PayNowItemType[]>([])
  useEffect(() => {
    setPayNowItems([
        {
          title: '车辆租金及门店服务费',
            amount: order.rent,
          waiverFee: order.waiverRent
        },
      {
        title: '手续费',
        amount: order.handlingFee,
        waiverFee: order.waiverHandlingFee
      },
      ...(order.insuranceFee ? [ {title: '驾无忧', amount: order.insuranceFee}, ] : []),
      ...(order.waiverHandlingFee + order.waiverRent > 0 ? [
          {title: '优惠卷减免', amount: -(order.waiverHandlingFee + order.waiverRent), activeColor: true }
        ] : []),
    ])

  }, [])
  const handleShowAmountDetail = () => setAmountVisible(true)
  const handleRebook = useRebook()
  const handleRelet = async () => {
    await taro.showToast({
      title: '当前订单无法续租'
    })
  }

  return (<>
    <Card>
      <View className={style.main}>
        <View className={style.amountWrapper}>
          <View>
            在线支付<Text className={style.amount}>￥{order.amount}</Text>
          </View>
          <View
            className={style.amountDetail}
            onClick={handleShowAmountDetail}
          >费用明细</View>
        </View>
        <View className={style.order} onClick={handleCopy}>
          <View>订单号: {getOrderNo(order)} </View>
          <Icon value='copy' className={style.icon} />
        </View>
        <View className={style.itemWrapper}>
          <View>
            <View>押金: <Text className={style.flag}>免收</Text></View>
          </View>
          <View
            className={style.freeze}
            onClick={handleShowAmountDetail}
          >免押明细</View>
        </View>
        <View className={style.itemWrapper}>
          <View>
            <View>租车合同: </View>
          </View>
          <View className={style.freeze}>取车合同、取车验车单</View>
        </View>
        <View className={style.dateWrapper}>
          <View>{convertDate(new Date(order.startTimeStamp))}</View>
          <View className={style.day}>
            <View>共{getDays(order)}天</View>
            <View className={style.line} />
          </View>
          <View>{convertDate(new Date(order.endTimeStamp))}</View>
        </View>
        <View className={style.actionWrapper}>
          {
            ['FINISHED', 'CANCELED'].includes( order.status ) && (
              <Button
                className={style.button}
                type='primary'
                onClick={() => handleRebook(order)}
              >再次预订</Button>
            )
          }
          {
            order.status === 'CAR_PICKUP_IN_PROGRESS' && (
              <Button className={style.button} type='primary'
                onClick={() => onCancelOrder(order)}
              >取消订单</Button>
            )
          }
          <Button
            className={style.button}
            type='primary'
            onClick={handleRelet}
          >续租</Button>
        </View>
        <OrderRemark order={order} />
      </View>
    </Card>
    {
      amountVisible && (
        <AmountDetail
          onClose={() => setAmountVisible(false)}
          depositItems={getDepositItems(order.deposit)}
          payNowItems={payNowItems}
          amount={order.amount}
        />
      )
    }

  </>)
}

export default Transaction
