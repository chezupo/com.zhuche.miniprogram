import {get} from "../util/requestClient";

export const getAreaStores = async (cityCode: string) => await get<AreaStoreType[]>(`/cities/${cityCode}/stores`)
