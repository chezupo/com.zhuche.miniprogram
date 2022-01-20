import SubscriptionBuilder from "../util/SubscriptionBuilder";
import {CategoryMapCitiesType, initCityCategories} from "./cities";

export type CityInfoType = {code: number; name: string; provinceCode: number, pinyin: string}


export default class Getters {
  public static citySearchObserve = new SubscriptionBuilder<string>('');
  public static isCitySearchObserve = new SubscriptionBuilder<boolean>(false);
  public static currentRouteObserve = new SubscriptionBuilder<string>('/pages/index/index')
}
