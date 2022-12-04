import * as React from "react";
import { View } from "@tarojs/components";
import style from "./style.module.scss";

const PlayIcon = (): React.ReactElement => {
  return (
    <View className={style.playIconCircle}>
      <View className={style.playIcon}></View>
    </View>
  );
};

export default PlayIcon;
