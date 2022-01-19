import SubscriptionServiceI, {SubscriptionHandler} from "./SubscriptionServiceI";

export default class SubscriptionService<T> implements SubscriptionServiceI<T>{
  history: {time: Date; data: T}[] = [];
  private subscriptions: Map<number, (patchData: T) => void> = new Map<number,(patchData: T) => void>();
  value: T;

  isComplete: boolean = false;

  constructor(value: T) {
    this.value = value;
  }

  next(patchData: T): boolean {
    if (this.isComplete) {
      return false
    }
    this.history = [...this.history, {time:new Date(), data: this.value}]
    this.value = patchData
    this.subscriptions.forEach(callback => callback(this.value))
    // console.log(this.history)
    // console.log(this.value)

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
