import * as React from "react";
import { ReactChild, ReactChildren } from "react";
import { Text, View } from "@tarojs/components";
import style from "./style.module.scss";

export type CarContainerPropsType = {
  children: ReactChild | ReactChildren;
  name: string;
};
const CarContainer = (props: CarContainerPropsType): React.ReactElement => {
  return (
    <View className={style.carContainerWrapper}>
      <View className={style.title}>
        <Text className={style.point}>*</Text>
        {props.name}
      </View>
      <View className={style.container}>{props.children}</View>
    </View>
  );
};

export default CarContainer;
