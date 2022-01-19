import {useEffect, useState} from "react";
import SubscriptionService from "./SubscriptionService";

const useObserve = <T>(observe: SubscriptionService<T>): [T, SubscriptionService<T>] => {
  const [value, setValue] = useState<T>(observe.value)

  useEffect(() => {
    const subscriptionHandler = observe.subscription((newValue) => {
      setValue(newValue)
    })

    return () => {
      observe.unSubscription(subscriptionHandler)
    }
  }, [])


  return [value, observe]
}

export default useObserve;
