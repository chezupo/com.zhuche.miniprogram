import { ReactChild, ReactChildren } from "react";
import React from "preact/compat";
import { View } from "@tarojs/components";
import style from "./style.module.scss";

type GroupContainerPropsType = {
  children: ReactChild | ReactChildren;
  title: string;
  style?: Record<string, string>;
};

const GroupContainer = (props: GroupContainerPropsType) => {
  return (
    <>
      <View className={style.title}>{props.title}</View>
      <View
        className={style.container}
        style={{ ...(props.style ? props.style : {}) }}
      >
        {props.children}
      </View>
    </>
  );
};

export default GroupContainer;
