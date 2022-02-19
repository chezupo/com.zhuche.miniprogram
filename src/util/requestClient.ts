import Taro from  "@tarojs/taro"

const prefixUrl = "https://a1001zhuche.jds.wuchuheng.com/api/v1"
export const get = <T>(url: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    Taro.request({
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
