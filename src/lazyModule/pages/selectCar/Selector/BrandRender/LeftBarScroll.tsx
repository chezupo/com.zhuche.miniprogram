import * as React from "react";
import { Image, View } from "@tarojs/components";
import style from "./style.module.scss";
import { BrandType } from "./index";

type LeftBarScrollPropsType = {
  brands: BrandType[];
  activeBrand: BrandType;
  onActiveBrand: (brand: BrandType) => void;
  checkBrandIds: number[];
};
const LeftBarScroll = ({
  brands,
  activeBrand,
  onActiveBrand,
  checkBrandIds
}: LeftBarScrollPropsType): React.ReactElement => {
  return (
    <View className={style.leftWrapper}>
      {brands.map(item => (
        <View
          className={[
            style.leftItemWrapper,
            activeBrand.id === item.id ? style.active : ""
          ].join(" ")}
          key={item.id}
          onClick={() => onActiveBrand(item)}
        >
          <Image src={item.url} className={style.image} />
          <View>{item.name}</View>
          {checkBrandIds.includes(item.id) && <View className={style.point} />}
        </View>
      ))}
    </View>
  );
};

export default LeftBarScroll;
