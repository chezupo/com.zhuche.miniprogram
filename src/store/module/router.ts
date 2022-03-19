import {store} from "../index";
// @ts-ignore
import taro from '@tarojs/taro'
import SubscriptionBuilder from "../../util/SubscriptionBuilder";

export  enum TabBarType {
  HOME,
  ORDER,
  ME
}

const homeUrl = '/pages/index/index'
const storeUrl = '/pages/index/stories/index'
const cityUrl = '/pages/index/city/index'
export const navigateTo = (url: string) => {
  taro.navigateTo({ url })
}
export const navigateToHome = () => {
  goToSwitchTab()
}
export const navigateToStore = () => {
  taro.navigateTo({url: storeUrl})
}
export const navigateToCity = () => {
  taro.navigateTo({url:cityUrl})
}

export const navigateToLoginOrRegister = () => {
  taro.navigateTo({ url: '/pages/login/index'})
}

export const getCurrentRoute = (): string => store.currentRoute.value

export const getHistory = (): string[] => store.currentRoute.history.map(i => i.data)

export const currentTabBarObserve: SubscriptionBuilder<TabBarType> = new SubscriptionBuilder<TabBarType>(TabBarType.HOME)

export const switchTab = (tabBar: TabBarType): void => {
  store.currentTab.next(tabBar)
  taro.reLaunch({ url: homeUrl })
}

export const goToSwitchTab = (): void => {
  taro.reLaunch({
    url: '/pages/index/index'
  })
}

export const navigateBack = ():void => {
  taro.navigateBack()
}
