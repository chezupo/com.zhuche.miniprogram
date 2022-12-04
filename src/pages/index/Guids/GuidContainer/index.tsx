import { Image, ITouchEvent, View } from "@tarojs/components";
import * as React from "react";
import style from "./style.module.scss";

export type ContainerType = {
  title: string;
  subTitle: string;
  svg: string;
  backgroundColor: string;
};
export type ContainerPropsType = {
  data: ContainerType;
  onClick: (e: ITouchEvent) => void;
};

const GuidContainer = (props: ContainerPropsType): React.ReactElement => {
  return (
    <View
      className={style.container}
      style={{ backgroundColor: props.data.backgroundColor }}
      onClick={props.onClick}
    >
      <View className={style.leftWrapper}>
        <View className={style.title}>{props.data.title}</View>
        <View className={style.subtitle}>{props.data.subTitle}</View>
        <View className={[style.subtitle, style.goDetail].join(" ")}>
          <View>立即查看</View>
          <View className={["at-icon at-icon-chevron-right"].join(" ")} />
        </View>
      </View>
      <View className={style.imageWrapper}>
        <Image src={props.data.svg} className={style.image} />
      </View>
    </View>
  );
};

export default GuidContainer;
