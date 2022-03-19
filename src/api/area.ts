import {get} from "../util/requestClient";
import {AreaStoreType} from "../typings";

export const getAreaStores = async (cityCode: string) => await get<AreaStoreType[]>(`/cities/${cityCode}/stores`)
