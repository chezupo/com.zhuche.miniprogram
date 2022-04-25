import taro from '@tarojs/taro'
import {store} from "../index";
import reduxStore from "../../reduxStore/index";
import {setActiveTab, TabBarType} from "../../reduxStore/module/layout";

const lazyModulePrefix = '/lazyModule'
const homeUrl = '/pages/index/index'
const storeUrl = `${lazyModulePrefix}/pages/stories/index`
const cityUrl = `${lazyModulePrefix}/pages/city/index`
const timeRangeUrl = `${lazyModulePrefix}/pages/DateTimePicker/index`
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
  taro.navigateTo({ url: `${lazyModulePrefix}/pages/login/index`})
}

const navigateToSelectCarPage = () => navigateTo(`${lazyModulePrefix}/pages/selectCar/index`)

const navigateToCarDetailPage = () => navigateTo(`${lazyModulePrefix}/pages/selectCar/CarDetail/index`)

const navigateToFeedbackPage = () => navigateTo(`${lazyModulePrefix}/pages/complaintFeedback/index`)

const navigateToPhoneLoginPage = () => navigateTo(`${lazyModulePrefix}/pages/login/phoneLogin/index`)

const navigateToCheckoutOrderAgreement = (index?: number) => {
  const params = index ? `?index=${index}` : ''
  navigateTo(`${lazyModulePrefix}/pages/CheckoutOrder/Agreements/index` + params)
}

const navigateToOrder = () => switchTab(TabBarType.ORDER)

const navigateToCheckoutOrder = () => navigateTo(`${lazyModulePrefix}/pages/CheckoutOrder/index`)

const navigateToUserCoupon = (amount?: number) => {
  const query = amount ? `?amount=${amount}` : ''
  navigateTo(`${lazyModulePrefix}/pages/CheckoutOrder/UserCoupon/index${query}`)
}

const getHistory = (): string[] => store.currentRoute.history.map(i => i.data)

const switchTab = (tabBar: TabBarType): void => {
  reduxStore.dispatch(setActiveTab(tabBar))
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
  getHistory,
  switchTab,
  goToSwitchTab,
  navigateToSelectCarPage,
  navigateToFeedbackPage,
  navigateToPhoneLoginPage,
  navigateToCarDetailPage,
  navigateToCheckoutOrderAgreement,
  navigateToUserCoupon,
  navigateToCheckoutOrder,
  navigateToOrder
}
