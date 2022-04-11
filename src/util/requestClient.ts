import * as Taro from "@tarojs/taro"
import store from "../reduxStore"

export const prefixUrl = "https://a1001zhuche.jds.wuchuheng.com/api/v1/miniProgram"
const getHeaders = (): Object => {
  const token = `Bearer ${store.getState().me.data?.accessToken || ''}`
  return   {...(token.length > 7 ? {header: {Authorization: token}} : {})}
}
export const get = <T>(url: string, query?: Record<string, any> ): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    Taro.request({
      ...getHeaders(),
      url: `${prefixUrl}${url}`,
      ...(query ? {data: query} : {}),
      success: (res) => {
        const {data} = res
        if (data.data) {
          return  resolve(data.data as T)
        } else if (data.data === null) {
          return resolve(null)
        }
      },
      fail: (e) => reject(e)
    });
  })
}

export const post = <T>(url: string, requestData?: Object): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    Taro.request({
      ...getHeaders(),
      method: 'POST',
      ...(requestData? {data: requestData} : {}),
      url: `${prefixUrl}${url}`,
      success: (res) => {
        const {data} = res
        if (data.data) {
          return  resolve(data.data as T)
        } else if (data.data === null) {
          return resolve(null)
        }
      },
      fail: (e) => reject(e)
    });
  })
}

export const put = <T>(url: string, requestData?: Object): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    Taro.request({
      ...getHeaders(),
      method: 'PUT',
      ...(requestData? {data: requestData} : {}),
      url: `${prefixUrl}${url}`,
      success: (res) => {
        const {data} = res
        if (data.data) {
          return  resolve(data.data as T)
        } else if (data.data === null) {
          return resolve(null)
        }
      },
      fail: (e) => reject(e)
    });
  })
}
