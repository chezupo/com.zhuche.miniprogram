import ErrorHandle, {ErrorType} from "../config/ErrorHandle";

export enum AllPlatformType {
  ALIPAY="alipay",
  WECHAT="wechat",
  H5="h5"
}

const getPlatformType = (): AllPlatformType => {
  switch (process.env.TARO_ENV) {
    case 'alipay': return AllPlatformType.ALIPAY;break;
    case 'weapp': return AllPlatformType.WECHAT; break;
    case 'h5': return AllPlatformType.H5; break;
  }
}

export const getPlatformName = (): string => {
  let platform: string
  if (getPlatformType() === AllPlatformType.ALIPAY) {
    platform = AllPlatformType.ALIPAY
  } else if (getPlatformType() === AllPlatformType.WECHAT) {
    platform = AllPlatformType.WECHAT
  } else {
    throw new ErrorHandle(ErrorType.NOT_SUPPORT_PLATFORM)
  }

  return platform
}

export default getPlatformType
