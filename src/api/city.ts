import {get} from "../util/requestClient";

export const getCity = async () => await get<CityType[]>('/cities')

export const getPopularCities = async () => await get<CityType[]>('/popularCities')
