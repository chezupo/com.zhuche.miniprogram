import * as React from "react";
import {View} from "@tarojs/components";
import NotFound from "../../../../components/NotFound";
import style from "./style.module.scss"

const EmptyRender = () => (
  <View className={style.notFoundWrapper}>
    <NotFound />
  </View>
)

export default EmptyRender
