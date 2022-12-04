import React from "react";
import { View } from "@tarojs/components";
import style from "./style.module.scss";

type PointPropsType = {
  borderSize?: number;
  color?: string;
  className?: string;
};
const Point = (props: PointPropsType): React.ReactElement => {
  return (
    <View
      style={{
        borderWidth: props.borderSize ? `${props.borderSize}px` : "2px",
        borderColor: props.color ? props.color : "red"
      }}
      className={`${style.main} ${props.className || ""}`}
    />
  );
};

export default Point;
