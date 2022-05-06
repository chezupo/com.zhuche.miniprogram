import {get, post, put} from "../util/requestClient";
import getPlatformType from "../util/platformType";
import {OrderItemType} from "../typings";

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
const createOrder = async (data: CreateOrderQueryType): Promise<OrderItemType> => {
  const platform = getPlatformType();
  return await post<OrderItemType>(`/orders/${platform}/orders`, data)
}

const getOrders = async (): Promise<OrderItemType[]> => {
  return await get<OrderItemType[]>(`/orders`)
}

const cancelOrder = async (id: number) => {
  return await put<OrderItemType>(`/orders/${getPlatformType()}/${id}/canceling`)
}
/**
 * 还车
 * @param id
 */
const returnCar = async (id: number) => await put<OrderItemType>(`/orders/${id}/status/returning`)

export {createOrder, getOrders, cancelOrder, returnCar}
