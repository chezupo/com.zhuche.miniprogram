import {CarItemType, CommentItemType} from "../typings";
import {get} from "../util/requestClient";

const getCars = async (storeId: number): Promise<CarItemType[]> => {
  return await get<CarItemType[]>(`/stores/${storeId}/cars`)
}

const getCarComments = async (id: number): Promise<CommentItemType[]> => {
  return await get<CommentItemType[]>(`/cars/${id}/comments`)
}

export {getCars, getCarComments}
