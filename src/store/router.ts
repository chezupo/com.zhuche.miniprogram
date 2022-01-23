import Getters from "./getters";
// @ts-ignore
import taro from '@tarojs/taro'

export const navigateTo = (url: string) => {
  taro.navigateTo({ url })
}

export const getCurrentRoute = (): string => Getters.currentRouteObserve.value

export const getHistory = (): string[] => Getters.currentRouteObserve.history.map(i => i.data)

export const navigateBack = ():void => {
  taro.navigateBack()
}
