declare type CityType = {
  code: string
  name: string
  pinyin: string
}

declare type ProvinceType = Omit<CityType, 'pinyin'>
declare type AreaType = Omit<CityType, 'pinyin'>

declare type StoreBannerType = {
  id: number
  imgKey: string
  prefixUrl: string
}

declare type GuidItemType = {
  id: number
  imgKey: string
  title: string
  prefixUrl: string
}
declare type AlipayAccount = {
  "createdAt": string
  "id": number
  "avatar": string
  "city": string
  "nickName": string
  "phone": string
  "province": string
  "gender": string
}

type WechatAccount = {
avatar: string
gender: "0" | "1" | "2"
nickName: string
phone: string
}

declare type UserItemType = {
  id: number
  username: string
  isEnabled: boolean
  alipayAccount?: AlipayAccount
  wechatAccount: WechatAccount
}

declare type StoreItemType = {
  id: number
  name: string
  mark: string
  starAt: string
  endAt: string
  address: string
  servicePhone: string
  lat: number
  lng: number
  isEnable: boolean
  isStation: boolean
  isAirport: boolean
  isSelfService: boolean
  banners: StoreBannerType[]
  pickupGuides: GuidItemType[],
  returnGuides: GuidItemType[],
  city: CityType
  area: AreaType
  province: ProvinceType
  admin: UserItemType
}

type AreaStoreType = {
  stores: StoreItemType[]
} & AreaType


declare type CarEngineType  = 'SUPERCHARGED' | 'NATURALLY_ASPIRATED' // 自然吸汽
declare type CarShiftType = 'AUTO' | 'MANUAL'

declare type CarPowerType =
  'GAS' // 汽油
  | 'ELECTRIC_GAS' // 油电
  | 'ELECTRIC'// 纯电


declare type BrandSeriesItemType = {
  id: number
  name: string
}
declare type BrandItemType = {
  id: number
  name: string
  imgKey: string
  store: StoreItemType
  seriesList: BrandSeriesItemType[]
}
declare type StoreCarConfigItemType = {
  id: number
  name: string
  store: StoreItemType
}
declare type CarCategoryItemType = {
  id: number
  name: string
  store: StoreItemType
}
declare type CarItemType = {
  id: number
  powerType: CarPowerType // 动力类型
  isSelfHelp: boolean // 是否自助
  displacement: number // 排量
  shift:CarShiftType // 档类型
  gasVolume: number // 油量
  seats: number // 座位数
  engineType:CarEngineType // 发动机类型
  name: string
  cover: string // 封面
  type: string // 车型
  tags: string[] // 标签
  licenseType: string // 牌照
  brandSeries: BrandSeriesItemType
  rand: BrandItemType // 品牌
  number: string // 车牌号
  isOnline: boolean // 是否上架
  rent: number // 租金
  deposit: number // 押金
  handlingFee: number // 手续费
  insuranceFee: number // 驾无忧(保险)
  configs: StoreCarConfigItemType[]
  createdAt: string
  updatedAt: string
  store: StoreItemType
  carCategory: CarCategoryItemType
  comments: CommentItemType[]
}

declare enum OrderPayType {
  ALIPAY ="ALIPAY",
  WECHAT = 'WECHAT'
}

declare type OrderStatus =
  'CREDITING' | // 信用授权中
  'PAYING' | // 支付中
  'CAR_PICKUP_IN_PROGRESS' | // 取车中
  'USING' | // 使用中
  'OVERTIME' | // 用车超时
  'RETURNING' | // 还车中
  'FINISHED' | // 已完成
  'RENEWED' | // 已续约
  'CANCELED' // 已取消

declare type OrderItemType = {
  id: number
  startTimeStamp: number
  endTimeStamp: number
  isInsurance: false,
  insuranceFee: number
  rent: number
  deposit: number
  handlingFee: number
  waiverAmount: number
  amount: number
  contract?: string
  alipayToken: string
  alipayTradeNo: string
  wechatPayToken: string // 微信支付用户id
  authBody: string
  outTradeNo: string // 订单号
  createAlipayAt: number
  createdAt: string
  status: OrderStatus
  user: UserItemType
  remark: string // 备注
  title: string
  startStore: StoreItemType
  payType: OrderPayType,
  endStore: StoreItemType
  car: CarItemType
  cover: string
  comment?: CommentItemType
  waiverHandlingFee: number
  waiverRent: number
  expiredFee: number
  expiredDays: number
  promotionLevel1?: number // 一级返点
  promotionLevel1User?: UserItemType
  promotionLevel2?: number // 二级返点
  promotionLevel2User?: UserItemType
}
declare type CommentItemType = {
  id: number
  createdAt: string
  content: string
  rating: number
  images: string[]
  user: UserItemType
  order: OrderItemType
}

declare type MeItemType = {
  id?: number,
  phone?: string,
  nickName?: string
  accessToken: string
  isNewUser: boolean
  avatar?: string
  city?: string
  code?: string
  countryCode?: string
  gender?: string
  province?: string
  isAuthorizeBaseInfo?: boolean
  balance?: number
  transactions: TransactionItemType[]
  commission: number; // 佣金
  withdrawnCommission: number; // 已提现佣金
  withdrawalInProgressCommission: number; // 提现中佣金
  idCarFrontal: string; // 身份证明面
  idCarBack: string // 背面
  driverLicense: string // 司机证
}

declare type TransactionItemType = {
  createdAt: string
  id: number
  amount: number
  failedReason?: string
  balance: number
  title: string
  payType: OrderPayType
  status:
  'FINISHED' // 成功
  | 'PROCESSING' // 处理中
  | 'FAILED' // 失败
  alipayOutTradeNo: string
  tradeNo: string
  user: {
    id: number
    username: string
    isEnabled: boolean
    balance: number
    alipayAccount: {
      createdAt: string
      id: number
      city: string
      nickName: string
      phone: string
      province: string
      gender: string
      countryCode: string
      code: string
      isAuthorizeBaseInfo: boolean
    }
  }
}

declare type AgreementItemType = {
  id: number
  title: string
  content: string
}

declare type UserCouponItemType = {
  id: number
  amount: number
  content: string
  createdAt: string
  expired: number
  isValid: boolean
  isWithHoliday: boolean
  isWithRent: boolean
  isWithServiceAmount: boolean
  meetAmount: number
  reason: string
  title: string
}

declare type UserContactItemType = {
  id: number
  name: string
  phone: string
  relation: string
}

declare type PageType<T> = {
  list: T[]
  total: number
  current: number
  size: number
}

declare type FeedbackItemType = {
  id: number
  flag: string
  content: string
  phone: string
  email?: string
}

declare type ViolationItemType = {
  id: number
  title: string
  description: string
  images: string[]; // 图
  amount: number; // 扣除的费
  freezeAmount: number; // 余下冻结的费
  user: UserItemType
}

declare type PosterItemType = {
  createdAt: string
  updatedAt: string
  id: number
  url: string
  size: number
  positionX: number
  positionY: number
}

declare type PromotionInfoType = {
  downLineCount: number
  orders:OrderItemType[],
  promotionLevel2Users: UserItemType[]
  promotionLevel1Users: UserItemType[]
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.svg';

declare type WechatPayToken = {
    "timeStamp":  number
    "signType": string
    "package": string,
    "nonceStr": string,
    "paySign": string
}
