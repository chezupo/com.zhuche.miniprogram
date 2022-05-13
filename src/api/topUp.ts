import {post} from "../util/requestClient";
import getPlatformType from "../util/platformType";

export type TopUpValueType = {
  amount: number
  remark: string
  isCommission?: boolean
}
const createToUpOrder = async (amount: TopUpValueType) => {
  return await post<string>(`/transaction/${getPlatformType()}/topUp`, amount)
}

export {createToUpOrder}
