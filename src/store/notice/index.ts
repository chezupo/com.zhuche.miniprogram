import SubscriptionBuilder from "../../util/SubscriptionBuilder";

type NoticeType = {
  isShow: boolean;
  content: string
}
export const noticeObserve: SubscriptionBuilder<NoticeType> = new SubscriptionBuilder<NoticeType>({
  isShow: true,
  content: '这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏'
})
