import {TopUpValueType} from "./topUp";
import {post} from "../util/requestClient";
import getPlatformType from "../util/platformType";

const createWithdraw = async (value: TopUpValueType) => {
  return await post<TransactionItemType[]>(`/withdrawing/${getPlatformType()}`, value)
}

export {createWithdraw}
