import SubscriptionBuilder from "../../util/SubscriptionBuilder";
import {getBanners} from "../../api/banners";

export type BannerType = {
  id: number
  imgKey: string
  content: string
  title: string
}
export type BannerListType = BannerType[]

export const bannerObserve: SubscriptionBuilder<BannerListType> = SubscriptionBuilder.initCallBack<BannerListType>([], async () => {
  return await getBanners()
})
