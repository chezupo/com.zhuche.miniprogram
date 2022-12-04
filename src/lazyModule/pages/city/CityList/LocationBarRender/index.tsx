import * as React from "react";
import { View } from "@tarojs/components";
import style from "../style.module.scss";
import { useAppSelector } from "../../../../../reduxStore";

type LocationBarRenderPropsType = {
  onChange: (key: string) => void;
};
const LocationBarRender: React.FC<LocationBarRenderPropsType> = props => {
  const { list } = useAppSelector(state => state.city);
  let LocationItemsRender: React.ReactElement[] = [];
  list.forEach((v, k) => {
    LocationItemsRender.push(
      <View
        className={style.letter}
        key={k}
        onClick={() => props.onChange(v.key)}
      >
        {v.key}
      </View>
    );
  });

  return (
    <View className={style.locationBarWrapper}>
      <View className={style.locationListWrapper}>{LocationItemsRender}</View>
    </View>
  );
};

export default LocationBarRender;
