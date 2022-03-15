import * as React from "react";
import SubscriptionBuilder from "../util/SubscriptionBuilder";
import {BannerListType, bannerObserve} from "./module/banner";
import {meObserve, MeType} from "./module/me";
import {currentTabBarObserve, TabBarType} from "./module/router";
import {commonDataObserve, CommonDataType} from "./module/common";
import {popularAttractionsObserve, PopularAttractionType} from "./module/stores";
import city, {CityType} from "./module/cities";
import {messageObserve, MessageType} from "./module/message";

export type CityInfoType = {code: number; name: string; provinceCode: number, pinyin: string}

export type StoreType = {
  banners: SubscriptionBuilder<BannerListType>
  me: SubscriptionBuilder<MeType>
  currentRoute:SubscriptionBuilder<string>
  isCitySearch:SubscriptionBuilder<boolean>
  citySearch: SubscriptionBuilder<string>
  currentTab: SubscriptionBuilder<TabBarType>
  commonData: SubscriptionBuilder<CommonDataType>
  popularAttractions: SubscriptionBuilder<PopularAttractionType>
  city: CityType,
  message: SubscriptionBuilder<MessageType>
}
export const store: StoreType = {
  banners:bannerObserve,
  me: meObserve,
  currentRoute: new SubscriptionBuilder<string>('/pages/index/index'),
  isCitySearch: new SubscriptionBuilder<boolean>(false),
  citySearch: new SubscriptionBuilder<string>(''),
  currentTab: currentTabBarObserve,
  commonData: commonDataObserve,
  popularAttractions: popularAttractionsObserve,
  city: city,
  message: messageObserve
}

export const AppStoreContext = React.createContext(store)

export const useAppStoreSelector = (): StoreType => {
  return React.useContext(AppStoreContext)
}
