import {useEffect, useState} from "react";
import SubscriptionBuilder from "./SubscriptionBuilder";

const useObserve = <T>(observe: SubscriptionBuilder<T>): [T, SubscriptionBuilder<T>] => {
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
