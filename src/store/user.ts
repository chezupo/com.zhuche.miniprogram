import SubscriptionBuilder from "../util/SubscriptionBuilder";

export type UserType = {
  id: number
  userName: string
}

export const isLoginObserve: SubscriptionBuilder<boolean> = new SubscriptionBuilder<boolean>(false)
export const userObserve: SubscriptionBuilder<UserType> = new SubscriptionBuilder<UserType>(null)

