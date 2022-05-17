import React, {useState} from "react";
import taro, {useRouter} from "@tarojs/taro";
import {View} from "@tarojs/components";
import {useEffect} from "preact/hooks";
// @ts-ignore
import style from './style.module.scss';
import RemarkRender from "./RemarkRender";
import Transaction from "./Transaction";
import Car from "./Car";
import Button from "../../../components/Button";
import Insurance from "./Insurance";
import {getOrderById} from "../../../api/order";
import Loading from "../../../components/Loading";
import BottomMenuBarRender from "./ButtonMenuBarRender";
import {useCancelOrder} from "../../../util/orderUtil";

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
  const handleCancelOrder = async (cancelOrder: OrderItemType) => {
    setLoading(true)
    try {
      await cancelOrderHook(cancelOrder)
      fetchOrderData()
    }finally {
      setLoading(false)
    }
  }
  return (
    <>
      {!order &&  loading &&  <Loading /> }
      {
        !!order && (
          <View className={style.main}>
            <View className={style.containerWrapper}>
              <RemarkRender order={order} />
              <Transaction
                order={order}
                onCancelOrder={handleCancelOrder}
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
    </>
  )
}

export default OrderDetailPage
