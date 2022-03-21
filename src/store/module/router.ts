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
const timeRangeUrl = '/pages/index/OperationInterface/DateRange/DateTimePicker/index'
const navigateTo = (url: string) => {
  taro.navigateTo({ url })
}
const navigateToHome = () => {
  goToSwitchTab()
}
const navigateToStore = () => {
  taro.navigateTo({url: storeUrl})
}
const navigateToCity = () => {
  taro.navigateTo({url:cityUrl})
}
const navigateTimeRangePage = () => taro.navigateTo({ url: timeRangeUrl})

const navigateToLoginOrRegister = () => {
  taro.navigateTo({ url: '/pages/login/index'})
}

const getCurrentRoute = (): string => store.currentRoute.value

const getHistory = (): string[] => store.currentRoute.history.map(i => i.data)

const currentTabBarObserve: SubscriptionBuilder<TabBarType> = new SubscriptionBuilder<TabBarType>(TabBarType.HOME)

const switchTab = (tabBar: TabBarType): void => {
  store.currentTab.next(tabBar)
  taro.reLaunch({ url: homeUrl })
}

const goToSwitchTab = (): void => {
  taro.reLaunch({
    url: '/pages/index/index'
  })
}

export const navigateBack = ():void => {
  taro.navigateBack()
}

export {
  navigateTo,
  navigateToHome,
  navigateToStore,
  navigateToCity,
  navigateTimeRangePage,
  navigateToLoginOrRegister,
  getCurrentRoute,
  getHistory,
  currentTabBarObserve,
  switchTab,
  goToSwitchTab,
}
