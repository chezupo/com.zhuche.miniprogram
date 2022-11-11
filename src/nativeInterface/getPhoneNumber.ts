import getPlatformType, {AllPlatformType} from "../util/platformType";

type GetPhoneNumberReturnType = {
  response: string
  sign: string
}
const getAlipayPhone = (): Promise<GetPhoneNumberReturnType> => {
  return new Promise<GetPhoneNumberReturnType>((resolve, reject) => {
    // @ts-ignore
    my.getPhoneNumber({
      success: (res) => {
        const encryptedData = JSON.parse(res.response) as GetPhoneNumberReturnType
        return resolve(encryptedData)
      },
      fail: (res) => {
        return reject(res)
      },
    });
  })
}

const getPhoneNumber = async (): Promise<GetPhoneNumberReturnType> => {
  switch (getPlatformType()) {
    case AllPlatformType.ALIPAY:
      return await getAlipayPhone();
    case AllPlatformType.WECHAT:

      break
  }
}




export default getPhoneNumber
