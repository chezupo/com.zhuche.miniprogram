import {get} from "../util/requestClient";

const getPromotionInfo = async () => {
  return await get<PromotionInfoType>('/me/promotion')
}

export {getPromotionInfo}
