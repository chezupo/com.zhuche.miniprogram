export type SubscriptionHandler = number

export default interface SubscriptionServiceI<T> {
  value: T;

  next(patchData: T): boolean;

  subscription(patchDataCallback:(patchData: T) => void ): SubscriptionHandler;

  unSubscription(subscriptionHandler: SubscriptionHandler): boolean;

  complete(): void
}
