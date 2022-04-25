import {get, post} from "../util/requestClient";
import getPlatformType from "../util/platformType";
import {OrderItemType} from "../typings";

type CreateOrderQueryType = {
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

export {createOrder, getOrders}
