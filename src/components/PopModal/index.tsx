import React from "preact/compat";
import { ReactNode } from "react";
import { View } from "@tarojs/components";
import SpinContainer from "../SpinContainer";
import style from "./style.module.scss";
import Button from "../Button";

type PopModalPropsType = {
  onCancel: () => void;
  onConfirm: () => void;
  content: string;
  title: string;
  confirm?: ReactNode;
  okText?: string;
  cancelText?: string;
};
const PopModal: React.FC<PopModalPropsType> = props => {
  return (
    <SpinContainer className={style.main}>
      <View className={style.container}>
        <View>{props.title}</View>
        <View className={style.content}>{props.content}</View>
        <View className={style.buttonWrapper}>
          {!!props.confirm && props.confirm}
          {!props.confirm && (
            <Button
              className={[style.button, style.confirm].join(" ")}
              onClick={() => props.onConfirm()}
            >
              {props.okText || "重新授权"}
            </Button>
          )}
          <Button
            className={[style.button, style.Isee].join(" ")}
            onClick={() => props.onCancel()}
          >
            {props.cancelText || "我知道了"}
          </Button>
        </View>
      </View>
    </SpinContainer>
  );
};

export default PopModal;
