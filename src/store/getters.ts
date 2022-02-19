import SubscriptionBuilder from "../util/SubscriptionBuilder";
import {ConfigurationObserve} from "./configuration";
import {bannerObserve} from "./banner";

export type CityInfoType = {code: number; name: string; provinceCode: number, pinyin: string}


export default class Getters {
  public static citySearchObserve = new SubscriptionBuilder<string>('');
  public static isCitySearchObserve = new SubscriptionBuilder<boolean>(false);
  public static currentRouteObserve = new SubscriptionBuilder<string>('/pages/index/index');
  public static configurationObserve = ConfigurationObserve
  public static bannerObserve = bannerObserve
}
