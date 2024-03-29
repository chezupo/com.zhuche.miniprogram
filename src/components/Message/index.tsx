import * as React from "react";
import { useCallback, useEffect, useReducer } from "preact/hooks";
import { CSSProperties, useState } from "react";
import { View } from "@tarojs/components";
import { store } from "../../store";
import TransitionEase from "../TransitionEase";
import { MessageType, MessageTypeType } from "../../store/module/message";
import { debounce } from "../../util/helper";
import style from "./style.module.scss";

type TimerType = ReturnType<typeof setTimeout>;

type MessagePropsType = {
  style?: CSSProperties;
};
const Message: React.FC<MessagePropsType> = props => {
  const typeMapColor: Record<MessageTypeType, CSSProperties> = {
    error: { backgroundColor: "rgb(239 68 68)" },
    success: { backgroundColor: "rgb(74 222 128)" },
    warning: { backgroundColor: "rgb(249 115 22)" },
    info: { backgroundColor: "rgb(161 161 170)" }
  };
  const [isShow, setIsShow] = useState<boolean>(false);
  const [message, messageDispatch] = useReducer(
    (state: MessageType, newMessage: MessageType): MessageType => {
      return newMessage;
    },
    null
  );
  const [, timerDispatch] = useReducer(
    (state: TimerType, newTimer: TimerType): TimerType => {
      state && clearTimeout(state);
      return newTimer;
    },
    null
  );
  const handleShowMessage = useCallback(
    debounce((newMessage: MessageType) => {
      messageDispatch(newMessage);
      setIsShow(true);
      const newTimer = setTimeout(() => {
        setIsShow(false);
      }, newMessage?.duration || 1000);
      timerDispatch(newTimer);
    }, 250),
    []
  );
  useEffect(() => {
    const messageSubscriptionHandler = store.message.subscription(
      newMessage => {
        handleShowMessage(newMessage);
      }
    );

    return () => {
      store.message.unSubscription(messageSubscriptionHandler);
    };
  }, []);
  let css: CSSProperties = message ? typeMapColor[message.type] : {};
  css = { ...css, ...(props.style || {}) };

  return (
    <TransitionEase
      visitable={isShow}
      height="8vw"
      style={css}
      className={style.main}
    >
      <View>{message ? message.title : ""}</View>
    </TransitionEase>
  );
};

export default Message;
