import {Base64} from "js-base64";
import {Image} from "@tarojs/components";
import * as React from "react";
import {IconPropsType} from "./icon";
import {ITouchEvent} from "@tarojs/components/types/common";

type BaseIconPropsType = {svg: string
  onClick?: (event: ITouchEvent) => void
} & IconPropsType


const BaseIcon = (props: BaseIconPropsType): React.ReactElement => {
  const imgSrc = `data:image/svg+xml;base64,${Base64.encode(props.svg)}`
  const handleClick = (e: ITouchEvent) => {
    props.onClick && props.onClick(e);
  }

  return (
    <Image
      src={imgSrc}
      className={props.className ? props.className : ''}
      onClick={handleClick}
    />
  )
}

export default BaseIcon
