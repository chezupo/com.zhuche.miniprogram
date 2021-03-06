import SubscriptionBuilder from "../../util/SubscriptionBuilder";

export type MessageTypeType = 'info' | 'success' | 'error' | 'warning'
export type MessageType = {
  title: string
  type: MessageTypeType
  duration?: number
}

export const messageObserve = new SubscriptionBuilder<MessageType>(null)
