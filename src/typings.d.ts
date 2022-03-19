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
  admin: {
    id: number
    username: string
    isEnabled: boolean
  }
}

type AreaStoreType = {
  stores: StoreItemType[]
} & AreaType
