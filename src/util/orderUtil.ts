import taro from "@tarojs/taro";
import {cancelOrder, deleteOrder} from "../api/order";
import {navigateTimeRangePage, navigateToHome} from "../store/module/router";
import {useAppDispatch} from "../reduxStore";
import {setCar, setEndStore, setStarStore, setStartCityThunk} from "../reduxStore/module/order";

const orderStatusMayStr: Record<OrderStatus, string> = {
  'CREDITING' :  '信用授权中',
  'PAYING' :  '待支付',
  'CAR_PICKUP_IN_PROGRESS' :  '待取车',
  'USING' :  '使用中',
  'OVERTIME' :  '用车超时',
  'RETURNING' :  '还车中',
  'FINISHED' :  '已完成',
  'RENEWED' :  '已续约',
  'CANCELED':  '已取消'
}

const getStatusMapInfo = (order: OrderItemType) => {
  const statusMapChinese: Record<OrderStatus, {title: string; notice?: string}> = {
    CREDITING: {title: '信用授权中', notice: ''},
    PAYING: {title: '待支付', notice: '您的订单还未支付，请及时支付'},
    CAR_PICKUP_IN_PROGRESS: {title: '取车中', notice: '请到门店提取您预定的汽车'},
    USING: {title: '使用中', notice: ''},
    OVERTIME: {title: '用车超时', notice: `您已用车超时${order.expiredDays?.toFixed(1)}天，还车时还需另外补交超时费用: ${order.expiredFee?.toFixed(2)}`},
    RETURNING: {title: '还车中', notice: `请把车开到${order.endStore.name}，完成还车`},
    RENEWED: {title: '已续约', notice: ''},
    FINISHED: {title: '已完成', notice: ''},
    CANCELED: {title:'已取消', notice: '' }
  }

  return statusMapChinese[order.status]
}

const getDepositItems = (deposit: number) => [
  { title: '车辆保证金(到店冻结,还车解冻)', amount: deposit},
]

/**
 * 取消订单hook
 * @param order
 */
const useCancelOrder = () => {
  return async (value: OrderItemType) => {
    const res =  await taro.showModal({ title: '你是否要取消这个订单?' })
    if (res.confirm) {
      await cancelOrder(value.id)
      await taro.showToast({title: '取消成功', duration: 5000})
    }
  }
}

/**
 * 删除订单
 */
const useDeleteOrder = () => {
  return async (value: OrderItemType) => {
    const res =  await taro.showModal({ title: '你是否要删除这个订单?' })
    if (res.confirm) {
      await deleteOrder(value.id)
      await taro.showToast({title: '删除成功', duration: 5000})
    }
  }
}

/**
 * 再次预订
 */
const useRebook = () => {
  const dispatch = useAppDispatch();
  return async (order: OrderItemType) => {
    await Promise.all([
      dispatch(setStartCityThunk(order.startStore.city)),
      dispatch(setStarStore(order.startStore)),
      dispatch(setEndStore(order.endStore)),
      dispatch(setCar(order.car))
    ])
    navigateToHome()
    navigateTimeRangePage(true)
  }
}

export {
  orderStatusMayStr,
  getStatusMapInfo,
  getDepositItems,
  useCancelOrder,
  useRebook,
  useDeleteOrder
}
