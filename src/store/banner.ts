import SubscriptionBuilder from "../util/SubscriptionBuilder";
import {getBanners} from "../api/banners";

export type BannerType = {
  id: number
  imgKey: string
  content: string
  title: string
}

export const bannerObserve = SubscriptionBuilder.initCallBack<BannerType[]>([], async () => {
  return await getBanners()
})
