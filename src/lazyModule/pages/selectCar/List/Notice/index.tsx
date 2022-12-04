import { Text, View } from "@tarojs/components";
import * as React from "react";
import style from "./style.module.scss";

const Notice = (): React.ReactElement => {
  return (
    <View className={style.noticeWrapper}>
      <Text className={style.notice}>全部</Text>
      <Text className={style.notice}>你要的全部都在这儿</Text>
    </View>
  );
};

export default Notice;
