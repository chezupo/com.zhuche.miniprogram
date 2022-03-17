import {get} from "../util/requestClient";
import {CityType} from "../typings";

export const getCity = async () => await get<CityType[]>('/cities')

export const getPopularCities = async () => await get<CityType[]>('/popularCities')
