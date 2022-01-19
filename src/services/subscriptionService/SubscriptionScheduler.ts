import SubscriptionService from "./SubscriptionService";

export default class SubscriptionScheduler {
  public static citySearchObserve = new SubscriptionService<string>("");
  public static isCitySearchObserve = new SubscriptionService<boolean>(false);
}
