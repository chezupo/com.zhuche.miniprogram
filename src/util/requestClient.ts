import * as Taro from "@tarojs/taro"
import store from "../reduxStore"
import {getToken} from "./authUtil";
import {navigateToLoginOrRegister} from "../store/module/router";

export const prefixUrl = process.env.apiPrefix
const getHeaders = (): Object => {
  const token = `Bearer ${store.getState().me.data?.accessToken || getToken() || ''}`
  return   {...(token.length > 7 ? {header: {Authorization: token}} : {})}
}
const checkRes = async <T>(res): Promise<T> => {
  const {data} = res
  if (data.isSuccess) {
    return data.data as T
  }
  if (data.errorCode === 40202) {
    navigateToLoginOrRegister()
  }
  throw new Error(data)
}
export const get = <T>(url: string, query?: Record<string, any> ): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    Taro.request({
      ...getHeaders(),
      url: `${prefixUrl}${url}`,
      ...(query ? {data: query} : {}),
      success: (res) =>
        checkRes<T>(res)
          .then((data) => resolve(data) )
          .catch(err => reject(err))
      ,
      fail: (e) => {
        console.error(e);
        reject(e);
      }
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
      success: (res) =>
        checkRes<T>(res)
          .then((data) => resolve(data) )
          .catch(err => reject(err))
      ,
      fail: (e) => {
        console.error(e);
        reject(e)}
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
      success: (res) =>
        checkRes<T>(res)
          .then((data) => resolve(data) )
          .catch(err => reject(err))
      ,
      fail: (e) =>  {
        console.error(e);
        reject(e)}
    });
  })
}

const deleteRequest = <T>(url: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    Taro.request({
      ...getHeaders(),
      method: 'DELETE',
      url: `${prefixUrl}${url}`,
      success: (res) =>
        checkRes<T>(res)
          .then((data) => resolve(data) )
          .catch(err => reject(err))
      ,
      fail: (e) => {
        console.error(e);
        reject(e)}
    });
  })
}

export {deleteRequest}
