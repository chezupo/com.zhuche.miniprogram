import * as React from "react";
import {useEffect, useState} from "react";
import taro, {usePullDownRefresh} from "@tarojs/taro";
import Tabs from "./Tabs";
import Loading from "../../components/Loading";
import {createOrderComment, deleteOrder, getOrders, returnCar} from "../../api/order";
import TabContainer from "./components/TabContainer";
import CommentRender, {SubmitType} from "./components/TabContainer/CommentRender";
import SpinContainer from "../../components/SpinContainer";
import {sleep} from "../../util/helper";
import tradePay from "../../nativeInterface/tradePay";
import {messageObserve} from "../../store/module/message";
import {useCancelOrder} from "../../util/orderUtil";
import getPlatformType, {AllPlatformType} from "../../util/platformType";

export type OrderCategoryType = {id: number; name: string; status:  OrderStatus[]}

export const tabs: OrderCategoryType[] = [
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
  {id: 2, name: '待取车', status: [
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
  const cancelOrderHook = useCancelOrder()
  const handleCancel = async (value: OrderItemType) => {
    setLoading(true)
    try {
      await cancelOrderHook(value)
    }finally {
      setLoading(false)
    }
    handleFetchData();
  }
  /**
   * 还车
   * @param value
   */
  const handleReturnCar = async (value: OrderItemType) => {
    setLoading(true)
    try {
      await returnCar(value.id)
      handleFetchData();
    }finally {
      setLoading(false)
    }
  }
  const onDeleteOrder = async (value: OrderItemType) => {
    setLoading(true)
    try {
      await deleteOrder(value.id)
      handleFetchData();
    }finally {
      setLoading(false)
    }
  }

  /**
   * 超时补交费用并还车
   * @param value
   */
  const handlePayOverTimeFeeAndReturnCar = async (value: OrderItemType) => {
    setLoading(true)
    try {
      await sleep(3000);
      handleFetchData();
    }finally {
      setLoading(false)
    }
  }
  const handlePay = async (value: OrderItemType) => {
    const data = value
    if (data.status === 'CREDITING') {
      data.authBody && await tradePay(data.authBody, true)
    }
    switch (getPlatformType()) {
      case AllPlatformType.ALIPAY:
        await tradePay(data.alipayTradeNo)
        break;
      case AllPlatformType.WECHAT:
        await tradePay(data.wechatPayToken)
        break;
      case AllPlatformType.H5:
        break;
      case AllPlatformType.TT:
        break;
    }
    messageObserve.next({
      title: '支付成功',
      duration: 300,
      type: 'success'
    })
    handleFetchData();
  }

  const [commentableOrder, setCommentableOrder] = useState<OrderItemType | undefined>()
  const handleComment = async (newComment: SubmitType) => {
    await taro.showLoading({title: '评论提交中...'})
    try {
      await createOrderComment(commentableOrder!.id, newComment)
      handleFetchData()
      setCommentableOrder(undefined)
      await taro.showToast({title: '评论添加成功'})
    }
    finally {
      await taro.hideLoading()
    }
  }
  return (<>
    { loading && <Loading /> }
    {
      !!commentableOrder && (
        <SpinContainer>
          <CommentRender
            onCancel={() => setCommentableOrder(undefined)}
            onSubmit={handleComment}
          />
        </SpinContainer>
      )
    }
    <Tabs
      tabs={tabs}
      activeId={activeId}
      onChange={handleChange}
    />
    <TabContainer
      onPayed={handlePay}
      onComment={setCommentableOrder}
      onReturnCar={handleReturnCar}
      onDeleteOrder={onDeleteOrder}
      onCancel={handleCancel}
      items={showOrders}
      onPayOverTimeFeeAndReturnCared={handlePayOverTimeFeeAndReturnCar}
      orderCategory={currentOrderCategory}
    />
    </>)
}

export default Order
