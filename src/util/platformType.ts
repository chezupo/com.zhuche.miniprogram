export enum AllPlatformType {
  ALIPAY,
  WECHAT,
  H5

}

const getPlatformType = (): AllPlatformType => {
  switch (process.env.TARO_ENV) {
    case 'alipay': return AllPlatformType.ALIPAY;break;
    case 'weapp': return AllPlatformType.WECHAT; break;
    case 'h5': return AllPlatformType.H5; break;
  }
}

const PlatformType = getPlatformType();

export default PlatformType;
