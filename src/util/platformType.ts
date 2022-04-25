import ErrorHandle, {ErrorType} from "../config/ErrorHandle";

export enum AllPlatformType {
  ALIPAY="alipay",
  WECHAT="wechat",
  H5="h5"
}

const playFormTypeMapName: Record<AllPlatformType, string> = {
  [AllPlatformType.ALIPAY]: '支付宝',
  [AllPlatformType.WECHAT]: '微信',
  [AllPlatformType.H5]: 'h5'
}

const getPlatformType = (): AllPlatformType => {
  switch (process.env.TARO_ENV) {
    case 'alipay': return AllPlatformType.ALIPAY;break;
    case 'weapp': return AllPlatformType.WECHAT; break;
    case 'h5': return AllPlatformType.H5; break;
  }
}

export const getPlatformName = (): AllPlatformType  => {
  let platform: AllPlatformType
  if (getPlatformType() === AllPlatformType.ALIPAY) {
    platform = AllPlatformType.ALIPAY
  } else if (getPlatformType() === AllPlatformType.WECHAT) {
    platform = AllPlatformType.WECHAT
  } else {
    throw new ErrorHandle(ErrorType.NOT_SUPPORT_PLATFORM)
  }

  return platform
}

const getChinesName = (): string => {
  return playFormTypeMapName[ getPlatformType()]
}

export {playFormTypeMapName, getChinesName}
export default getPlatformType
