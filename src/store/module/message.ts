import SubscriptionBuilder from "../../util/SubscriptionBuilder";

export type MessageType = {
  title: string
  type: 'info' | 'success' | 'error' | 'warning'
  duration?: number
}

export const messageObserve = new SubscriptionBuilder<MessageType>(null)
