// @ts-ignore
import React from "react";
// eslint-disable-next-line import/first
import {View} from "@tarojs/components";
import style from "./style.module.scss";

type PointPropsType = {borderSize?: number; color?: string;}
const Point = (props: PointPropsType):React.ReactElement => {
  return (<View
    style={{
    borderWidth: props.borderSize ? `${props.borderSize}px` : '2px',
    borderColor: props.color ? props.color : 'red'
  }}
    className={style.main}
  />) }

export default Point
