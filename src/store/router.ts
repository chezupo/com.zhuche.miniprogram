import Getters from "./getters";
// @ts-ignore
import taro from '@tarojs/taro'
import SubscriptionBuilder from "../util/SubscriptionBuilder";

export  enum TabBarType {
  HOME,
  ORDER
}

export const navigateTo = (url: string) => {
  taro.navigateTo({ url })
}
export const getCurrentRoute = (): string => Getters.currentRouteObserve.value

export const getHistory = (): string[] => Getters.currentRouteObserve.history.map(i => i.data)

export const currentTabBarObserve: SubscriptionBuilder<TabBarType> = new SubscriptionBuilder<TabBarType>(TabBarType.HOME)

export const switchTab = (tabBar: TabBarType): void => {
  currentTabBarObserve.next(tabBar)
  taro.redirectTo({
    url: '/pages/index/index'
  })
}

export const navigateBack = ():void => {
  taro.navigateBack()
}
