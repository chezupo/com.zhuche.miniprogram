import SubscriptionBuilder from "../util/SubscriptionBuilder";

type NoticeType = {
  isShow: boolean;
  content: string
}
type CommonDataType = {
  servicePhone: string;
  notice: NoticeType
}

export const commonDataObserve: SubscriptionBuilder<CommonDataType> = new SubscriptionBuilder({
  servicePhone: '400-400-400',
  notice: {
    isShow: false,
    content: null
  }
})
