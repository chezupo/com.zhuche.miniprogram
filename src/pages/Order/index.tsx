import * as React from "react";
import taro, {usePullDownRefresh} from "@tarojs/taro";
import {useEffect, useState} from "react";
import Tabs from "./Tabs";
// @ts-ignore
import style from "./style.module.scss"
import Loading from "../../components/Loading";
import {cancelOrder, getOrders} from "../../api/order";
import {OrderItemType, OrderStatus} from "../../typings";
import TabContainer from "./components/TabContainer";

export type OrderCategoryType = {id: number; name: string; status:  OrderStatus[]}

const tabs: OrderCategoryType[] = [
  {id: 0, name: '全部', status: [
      'CREDITING',  // 信用授权中
      'PAYING',  // 支付中
      'CAR_PICKUP_IN_PROGRESS',  // 取车中
      'USING',  // 使用中
      'RETURNING',  // 还车中
      'FINISHED',  // 已完成
      'OVERTIME',  // 用车超时
      'RENEWED',  // 已续约
      'CANCELED' // 已取消
    ]
  },
  {id: 1, name: '待支付', status:  [
      'CREDITING',  // 信用授权中
      'PAYING',  // 支付中
    ]},
  {id: 2, name: '取车中', status: [
      'CAR_PICKUP_IN_PROGRESS',  // 取车中
    ]},
  {id: 3, name: '进行中', status: [
      'USING',  // 使用中
      'RETURNING',  // 还车中
    ]},
  {id: 4, name: '已完成', status: [
      'FINISHED',  // 已完成
    ]},
]
const Order = () : React.ReactElement => {
  const [activeId, setActiveId] = useState<number>(0)
  const [loading, setLoading ] = useState<boolean>(false)
  const [allOrders, setAllOrders] = useState<OrderItemType[]>([])
  const [showOrders, setShowOrders] = useState<OrderItemType[]>([])
  const [currentOrderCategory, setCurrentOrderCategory ]= useState<OrderCategoryType>(tabs[0])
  const handleFetchData = () => {
    setLoading(true)
    getOrders().then(newOrders => {
      setAllOrders(newOrders)
      setShowOrders(newOrders)
      setLoading(false)
      taro.stopPullDownRefresh()
    } ).catch(() => {
      setLoading(false)
      taro.stopPullDownRefresh()
    })
  }
  usePullDownRefresh(() => {
    handleFetchData()
  })

  useEffect(() => {
    handleFetchData()
  }, [])

  const handleChange = (changeActiveId: number) => {
    setActiveId(changeActiveId)
    const currentTab = tabs.filter(tab => tab.id === changeActiveId)[0]
    const newOrders =  allOrders.filter(item => currentTab.status.includes(item.status))
    setShowOrders(newOrders )
    setCurrentOrderCategory(currentTab)
  }
  const handleCancel = async (value: OrderItemType) => {
   const res =  await taro.showModal({ title: '你是否要取消这个订单?' })
    if (res.confirm) {
      setLoading(true)
      await cancelOrder(value.id)
      handleFetchData();
      await taro.showToast({title: '取消成功', duration: 5000})
    }
  }

  return (<>
    { loading && <Loading /> }
    <Tabs
      tabs={tabs}
      activeId={activeId}
      onChange={handleChange}
    />
    <TabContainer
      onCancel={handleCancel}
      items={showOrders}
      orderCategory={currentOrderCategory}
    />
    </>)
}

export default Order
