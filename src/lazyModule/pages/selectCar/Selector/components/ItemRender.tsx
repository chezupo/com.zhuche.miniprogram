import React from "react";
import { View } from "@tarojs/components";
import style from "../PriceRender/style.module.scss";

type ItemRenderPropsType = {
  title: string;
  isActive: boolean;
  onClick?: () => void;
};
const ItemRender: React.FC<ItemRenderPropsType> = props => {
  return (
    <View
      className={[style.item, props.isActive ? style.active : ""].join(" ")}
      onClick={() => props.onClick && props.onClick()}
    >
      {props.title}
    </View>
  );
};

export default ItemRender;
