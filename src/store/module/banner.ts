import SubscriptionBuilder from "../../util/SubscriptionBuilder";
import {getBanners} from "../../api/banners";

export type BannerType = {
  id: number
  imgKey: string
  prefixUrl: string
  content: string
  title: string
}
export type BannerListType = BannerType[]

export const bannerObserve: SubscriptionBuilder<BannerListType> = new SubscriptionBuilder<BannerListType>([])
