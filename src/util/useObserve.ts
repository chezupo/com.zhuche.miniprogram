import {useEffect, useState} from "react";
import SubscriptionBuilder from "./SubscriptionBuilder";

export type UseObserveType = <T>(observe: SubscriptionBuilder<T>) => [T, SubscriptionBuilder<T>]

const useObserve: UseObserveType = <T>(observe) => {
  const [value, setValue] = useState<T>(observe.value)

  useEffect(() => {
    const subscriptionHandler = observe.subscription((newValue) => {
      setValue(newValue)
    })

    return () => {
      observe.unSubscription(subscriptionHandler)
    }
  }, [value])


  return [value, observe]
}

export default useObserve;
