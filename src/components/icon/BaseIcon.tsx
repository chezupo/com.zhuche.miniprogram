import {Base64} from "js-base64";
import {Image} from "@tarojs/components";
import * as React from "react";
import {IconPropsType} from "./icon";

type BaseIconPropsType = {svg: string} & IconPropsType

const BaseIcon = (props: BaseIconPropsType): React.ReactElement => {
  const imgSrc = `data:image/svg+xml;base64,${Base64.encode(props.svg)}`

  return (
    <Image src={imgSrc} className={props.className ? props.className : ''} />
  )
}

export default BaseIcon
