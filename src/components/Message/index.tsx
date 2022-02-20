import * as React from "react";
import {useEffect} from "react";
import {AtMessage} from "taro-ui";
import useObserve from "../../util/useObserve";
import {useAppStoreSelector} from "../../store";
import * as taro from "@tarojs/taro";

const Message: React.FC = () => {
  const [,messageObserve] = useObserve(useAppStoreSelector().message)
  useEffect(() => {
    const messageSubscriptionHandler = messageObserve.subscription((newMessage) => {
      taro.atMessage({
        message: newMessage.title,
        type: newMessage.type,
        duration: newMessage.duration ? newMessage.duration : 5000
      })
    })

    return () => {
      messageObserve.unSubscription(messageSubscriptionHandler)
    }
  }, [])
  return( <AtMessage />)
}

export default Message

