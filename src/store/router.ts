import Getters from "./getters";
// @ts-ignore
import taro from '@tarojs/taro'

export const redirectTo = (url: string) => {
  taro.redirectTo({
    url,
    success: () => {
      Getters.currentRouteObserve.next(url)
    }
  })
}

export const getCurrentRoute = (): string => Getters.currentRouteObserve.value

export const getHistory = (): string[] => Getters.currentRouteObserve.history.map(i => i.data)

export const goBackRoute = ():void => {
  const history = getHistory()
  redirectTo(history[history.length - 2])
}
