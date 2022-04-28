import {StoreItemType} from "../typings";
import {get} from "../util/requestClient";

export const getStores = async (keyword: string) => {
    return await get<StoreItemType[]>(`/stores`, {keyword})
}

const getStoreById = async (id: number) => {
  return await get<StoreItemType>(`/stores/${id}`)
}

export {getStoreById}

