export type SubscriptionHandler = number

interface SubscriptionServiceI<T> {
  value: T;

  next(patchData: T): boolean;

  subscription(patchDataCallback:(patchData: T) => void ): SubscriptionHandler;

  unSubscription(subscriptionHandler: SubscriptionHandler): boolean;

  complete(): void
}

export default class SubscriptionBuilder<T> implements SubscriptionServiceI<T>{
  history: {time: Date; data: T}[] = [];
  private subscriptions: Map<number, (patchData: T) => void> = new Map<number,(patchData: T) => void>();
  value: T;

  isComplete: boolean = false;

  constructor(value: T) {
    this.value = value;
    this.pushHistory(this.value)
  }

  static initCallBack<T>(value: T, callback: () => Promise<T>) {
    const subscriptionHandler = new SubscriptionBuilder<T>(value)
    callback().then(newValue => subscriptionHandler.next(newValue))

    return subscriptionHandler
  }

  private pushHistory(newRecord: T): void {

    this.history = [...this.history, {time:new Date(), data: newRecord}]
  }

  next(patchData: T): boolean {
    if (this.isComplete) {
      return false
    }
    this.value = patchData
    this.pushHistory(this.value)
    this.subscriptions.forEach(callback => callback(this.value))
    return true;
  }

  subscription(patchDataCallback: (patchData: T) => void): SubscriptionHandler {
    const subscriptionHandler = this.subscriptions.size + 1;
    this.subscriptions.set(subscriptionHandler, patchDataCallback)

    return subscriptionHandler;
  }

  unSubscription(subscriptionHandler: SubscriptionHandler): boolean {
    return !this.subscriptions.has(subscriptionHandler) ?  false : this.subscriptions.delete(subscriptionHandler);
  }

  complete(): void {
    this.isComplete = true;
    delete this.subscriptions
  }
}
