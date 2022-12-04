import React from "preact/compat";
import { View } from "@tarojs/components";
import style from "./style.module.scss";
import Icon from "../../../../../../components/Icon";

type NameRenderPropsType = {
  name: string;
  rate: number;
  isAirport: boolean;
  isTrain: boolean;
  isH24: boolean;
  mark: string;
};
const NameRender: React.FC<NameRenderPropsType> = props => {
  return (
    <View className={style.headerWrapper}>
      <View className={style.nameWrapper}>
        <View className={style.name}>
          {props.name}
          {props.mark.length > 0 ? `(${props.mark})` : ""}
        </View>
        <View className={style.iconWrapper}>
          {props.isH24 && (
            <View className={`${style.icon} ${style.h24}`}>24h</View>
          )}
          {props.isAirport && <Icon value="airport" className={style.icon} />}
          {props.isTrain && <Icon value="train" className={style.icon} />}
        </View>
      </View>
      <View className={style.rate}>{props.rate}分 满意</View>
    </View>
  );
};

export default NameRender;
