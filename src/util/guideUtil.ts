import taro from "@tarojs/taro";

const returnGuidesKey = 'returnGuides'
const pickUpGuidesKey = 'pickUpGuides'
const setGuides = (key: string, guides: GuidItemType[]) => {
  taro.setStorageSync(key, JSON.stringify(guides))
}

const getGuides = (key: string): GuidItemType[] => {
  return JSON.parse( taro.getStorageSync(key) ) as GuidItemType[]
}

const getReturnGuides = () => getGuides(returnGuidesKey)
const getPickUpGuides = () => getGuides(pickUpGuidesKey)
const setPickUpGuides = (guides: GuidItemType[]) => setGuides(pickUpGuidesKey, guides)
const setReturnGuides = (guides: GuidItemType[]) => setGuides(returnGuidesKey, guides)

export {
  getReturnGuides,
  getPickUpGuides,
  setPickUpGuides,
  setReturnGuides
}

