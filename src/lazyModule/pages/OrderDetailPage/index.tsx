import React, {useState} from "react";
import taro, {useRouter} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {useEffect} from "preact/hooks";
// @ts-ignore
import style from './style.module.scss';
import RemarkRender from "./RemarkRender";
import Transaction from "./Transaction";
import Car from "./Car";
import {expireOrder, getOrderById} from "../../../api/order";
import Loading from "../../../components/Loading";
import BottomMenuBarRender from "./ButtonMenuBarRender";
import {useCancelOrder, useDeleteOrder} from "../../../util/orderUtil";
import tradePay from "../../../nativeInterface/tradePay";
import {sleep} from "../../../util/helper";
import SpinContainer from "../../../components/SpinContainer";
import PanelRenderer from "./Transaction/PanelRender";
import {navigateToOrder} from "../../../store/module/router";
import {messageObserve} from "../../../store/module/message";

const OrderDetailPage: React.FC = () => {
  const {params} = useRouter()
  const [order, setOrder] = useState<OrderItemType | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const fetchOrderData = () => {
    setLoading(true)
    getOrderById(parseInt(params.id)).then(res => {
      setOrder(res)
      taro.setNavigationBarTitle({title: `订单号 ${res.alipayTradeNo}`})
        .then(
          () => console.log("set order detail title")
        )
    })
      .finally( () => setLoading(false) )
  }
  useEffect(() => {
    params.id && fetchOrderData()
  }, [])
  const cancelOrderHook = useCancelOrder()
  const deleteOrderHook = useDeleteOrder()
  const handleCancelOrder = async (cancelOrder: OrderItemType) => {
    setLoading(true)
    try {
      await cancelOrderHook(cancelOrder)
      fetchOrderData()
    }finally {
      setLoading(false)
    }
  }
  const handleReletSubmit = async (days: number) => {
    await taro.showLoading({title: '续租中...'})
    try {
      const tradeNo = await expireOrder(order.id, {days})
      await tradePay(tradeNo)
      await sleep(3000)
      setReletPanel(false)
      fetchOrderData()
      await taro.showToast({title: '续租成功'})
    }finally {
      await taro.hideLoading();
    }
  }
  /**
   * 删除订单
   * @param deleteOrder
   */
  const onDeleteOrder = async  (deleteOrder: OrderItemType) => {
    setLoading(true)
    try {
      await deleteOrderHook(deleteOrder)
      const duration =  2000
      messageObserve.next({
          title: '删除订单成功',
          type: 'success',
          duration,
        })
      setTimeout(() => {
        navigateToOrder();
      }, duration)
    }finally {
      setLoading(false)
    }
  }
  const [reletPanel, setReletPanel] = useState<boolean>(false)
  return (
    <>
      {!order &&  loading &&  <Loading className={style.loading} /> }
      {
        !!order && (
          <View className={style.main}>
            <View className={style.containerWrapper}>
              <RemarkRender order={order} />
              <Transaction
                onRelet={() => setReletPanel(true)}
                order={order}
                onCancelOrder={handleCancelOrder}
                onReletSubmit={handleReletSubmit}
                onDeleteOrder={onDeleteOrder}
              />
              <Car order={order} />
            </View>
            <View className={style.bottomWrapper}>
              <BottomMenuBarRender
                order={order}
              />
            </View>
          </View>
        )
      }
      {
        reletPanel && (
          <SpinContainer>
            <PanelRenderer order={order} onCancel={() => setReletPanel(false)} onSubmit={handleReletSubmit} />
          </SpinContainer>
        )
      }
    </>
  )
}

export default OrderDetailPage
