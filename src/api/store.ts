import {get} from "../util/requestClient";

export const getStores = async (keyword: string) => {
    return await get<StoreItemType[]>(`/stores`, {keyword})
}

const getStoreById = async (id: number) => {
  return await get<StoreItemType>(`/stores/${id}`)
}

const getStoreComments = async (id: number) => {
  return await get<PageType<CommentItemType>>(`/stores/${id}/comments`)
}

const getStoreByLocation = async (params: {lat: number, lng: number}) =>  get<StoreItemType>(`/store`, params)

export {getStoreById, getStoreComments, getStoreByLocation}

