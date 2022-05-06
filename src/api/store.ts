import {CommentItemType, StoreItemType} from "../typings";
import {get} from "../util/requestClient";

export const getStores = async (keyword: string) => {
    return await get<StoreItemType[]>(`/stores`, {keyword})
}

const getStoreById = async (id: number) => {
  return await get<StoreItemType>(`/stores/${id}`)
}

const getStoreComments = async (id: number) => {
  return await get<CommentItemType[]>(`/stores/${id}/comments`)
}

export {getStoreById, getStoreComments}

