export type CityType = {
  code: string
  name: string
  pinyin: string
}

export type ProvinceType = Omit<CityType, 'pinyin'>
export type AreaType = Omit<CityType, 'pinyin'>

export type StoreBannerType = {
  id: number
  imgKey: string
  prefixUrl: string
}

export type GuidType = {
  id: number
  imgKey: string
  title: string
  prefixUrl: string
}

declare type UserItemType = {
  id: number
  username: string
  isEnabled: boolean
}

export type StoreItemType = {
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
  pickupGuides: GuidType[],
  returnGuides: GuidType[],
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
  price: number
  configs: StoreCarConfigItemType[]
  deposit: number
  createdAt: string
  updatedAt: string
  store: StoreItemType
  carCategory: CarCategoryItemType
}
declare type OrderItemType = {
  id: number
}
declare type CommentItemType = {
  "id": number
  createdAt: string
  "content": string
  "rating": number
  "images": string[]
  "flag": string
  "order": OrderItemType
  "car": CarItemType
  "user": UserItemType
  "store": StoreItemType
}
