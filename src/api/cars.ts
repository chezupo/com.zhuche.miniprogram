import {get} from "../util/requestClient";

const getCars = async (storeId: number): Promise<CarItemType[]> => {
  return await get<CarItemType[]>(`/stores/${storeId}/cars`)
}

const getCarComments = async (id: number): Promise<CommentItemType[]> => {
  return await get<CommentItemType[]>(`/cars/${id}/comments`)
}

const getCarByid = async (id: number): Promise<CarItemType> => await get(`/cars/${id}`)

export {getCars, getCarComments, getCarByid}
