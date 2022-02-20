import {CityInfoType, store} from "../index";
import {navigateBack} from "./router";
import SubscriptionBuilder from "../../util/SubscriptionBuilder";

export enum CityCategory {
  POPULAR="热门城市",
  A = "A", B = "B", C = "C", D = "D", E = "E", F = "F",
  G = "G", H = "H", I = "I", J = "J", K = "K", L = "L",
  M = "M", N = "N", O = "O", P = "P", Q = "Q", R = "R",
  S = "S", T = "T", U = "U", V = "V", W = "W", X = "X",
  Y = "Y", Z = "Z"
}
export type CategoryMapCitiesType = Map<CityCategory, CityInfoType[]>
export enum CurrentPickCityPointType {
  START,
  END
}
export type CityType = {
  startCity: SubscriptionBuilder<CityInfoType>
  endCity: SubscriptionBuilder<CityInfoType>
  currentPickCityPoint: SubscriptionBuilder<CurrentPickCityPointType>
  isForeignCityObserve: SubscriptionBuilder<boolean>
  cityCategoriesObserve:SubscriptionBuilder<CategoryMapCitiesType>
}

export const initCityCategories = new Map<CityCategory, CityInfoType[]>([
  [CityCategory.POPULAR, [
    { code: 4601,	name: "海口市", provinceCode:	46,	pinyin: "haikoushi"},
    { code: 4602,	name: "三亚市", provinceCode:	46,	pinyin: "sanyashi"},
    { code: 4603,	name: "三沙市", provinceCode:	46,	pinyin: "sanshashi"},
    { code: 4604,	name: "儋州市", provinceCode:	46,	pinyin: "danzhoushi"},
    { code: 4690,	name: "省直辖县级行政区划", provinceCode:	46,	pinyin: "shengzhixiaxianjixingzhengquhua"}
  ]],
  [CityCategory.S, [
    { code: 4602,	name: "三亚市", provinceCode:	46,	pinyin: "sanyashi"},
    { code: 4603,	name: "三沙市", provinceCode:	46,	pinyin: "sanshashi"},
    { code: 4690,	name: "省直辖县级行政区划", provinceCode:	46,	pinyin: "shengzhixiaxianjixingzhengquhua"},
  ]],
  [ CityCategory.H, [
    { code: 4601,	name: "海口市", provinceCode:	46,	pinyin: "haikoushi"}
  ]],
  [ CityCategory.D, [
    { code: 4604,	name: "儋州市", provinceCode:	46,	pinyin: "danzhoushi"}
  ]]
])

const startCityObserve: SubscriptionBuilder<CityInfoType> = new SubscriptionBuilder<CityInfoType>(
  { code: 4601,	name: "海口市", provinceCode:	46,	pinyin: "haikoushi"}
)

const endCityObserve: SubscriptionBuilder<CityInfoType> = new SubscriptionBuilder<CityInfoType>(
  { code: 4601,	name: "海口市", provinceCode:	46,	pinyin: "haikoushi"}
)

const currentPickCityPointObserve: SubscriptionBuilder<CurrentPickCityPointType> = new SubscriptionBuilder<CurrentPickCityPointType>(CurrentPickCityPointType.START)
const isForeignCityObserve: SubscriptionBuilder<boolean> = new SubscriptionBuilder<boolean>(false)

const cityCategoriesObserve = new SubscriptionBuilder<CategoryMapCitiesType>(initCityCategories)


export const pickCity = (cityInfo: CityInfoType): void => {
  switch (store.city.currentPickCityPoint.value) {
    case CurrentPickCityPointType.END:
      store.city.endCity.next(cityInfo)
      break;
    case CurrentPickCityPointType.START:
      store.city.startCity.next(cityInfo)
      break;

  }

  navigateBack()
}

const city: CityType = {
  startCity: startCityObserve,
  endCity: endCityObserve,
  currentPickCityPoint: currentPickCityPointObserve,
  isForeignCityObserve: isForeignCityObserve,
  cityCategoriesObserve: cityCategoriesObserve
}
export default city
