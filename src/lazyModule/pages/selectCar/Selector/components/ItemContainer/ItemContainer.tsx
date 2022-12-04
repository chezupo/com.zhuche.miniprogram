import React from "react";
import { View } from "@tarojs/components";
import style from "./style.module.scss";

type ContainerPropsType = {
  title: string;
  children: React.ReactChildren | React.ReactNode;
  className?: string;
};
const ItemContainer: React.FC<ContainerPropsType> = props => {
  return (
    <>
      <View className={style.title}>{props.title}</View>
      <View className={[props.className || ""].join(" ")}>
        {props.children}
      </View>
    </>
  );
};

export default ItemContainer;
