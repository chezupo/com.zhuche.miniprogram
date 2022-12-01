import {deleteRequest, get, post, put} from "../util/requestClient";
import getPlatformType from "../util/platformType";

type CreateOrderQueryType = {
  remark: string
  carId: number
  endStoreId: number
  startStoreId: number
  isInsurance: boolean
  userCouponId?: number
  startTimeStamp: number
  endTimeStamp: number
}
type CreateOrderCommentType = {
  content: string
  rate: number
}
type ExpireOrderQueryType = {
  days:number
}
const createOrder = async (data: CreateOrderQueryType): Promise<OrderItemType> => {
  const platform = getPlatformType();
  return await post<OrderItemType>(`/orders/${platform}/orders`, data)
}

const getOrders = async (): Promise<OrderItemType[]> => {
  return await get<OrderItemType[]>(`/orders`)
}
const getOrderById = async (orderId: number): Promise<OrderItemType> => {
  return await get<OrderItemType>(`/orders/${orderId}`)
}
const tradeOverTimeOrderById = async (orderId: number) => {
  return await post<string>(`/orders/${orderId}/trade/overtime`)
}
const cancelOrder = async (id: number) => {
  return await put<OrderItemType>(`/orders/${getPlatformType()}/${id}/canceling`)
}
/**
 * 还车
 * @param id
 */
const returnCar = async (id: number) => await put<OrderItemType>(`/orders/${id}/status/returning`)

/**
 * 删除订单
 * @param id
 */
const  deleteOrder= async (id: number) => await deleteRequest<void>(`/orders/${id}`)

const createOrderComment = async (orderId: number, value: CreateOrderCommentType) => {
  return await post<OrderItemType>(`/orders/${orderId}/commands`, value)
}

/**
 * 订单续租
 * @param id
 * @param data
 */
const expireOrder = async (id: number,  data: ExpireOrderQueryType) => await put<string>(`/orders/${id}/expired`, data)

export {
  createOrder,
  getOrders,
  cancelOrder,
  returnCar,
  createOrderComment,
  getOrderById,
  tradeOverTimeOrderById,
  expireOrder,
  deleteOrder
}
