import {post} from "../util/requestClient";
import getPlatformType from "../util/platformType";

const createToUpOrder = async (amount: number) => {
  return await post<string>(`/transaction/${getPlatformType()}/topUp`, {amount})
}

export {createToUpOrder}
