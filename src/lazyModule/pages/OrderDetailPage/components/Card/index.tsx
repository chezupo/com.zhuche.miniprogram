import React from "preact/compat";
import { ReactNode } from "react";
import { View } from "@tarojs/components";
import style from "./style.module.scss";

type CardPropsType = {
  children: ReactNode | ReactNode[];
  className?: string;
};
const Card: React.FC<CardPropsType> = props => {
  return (
    <View className={`${style.main} ${props.className || ""}`}>
      {props.children}
    </View>
  );
};

export default Card;
