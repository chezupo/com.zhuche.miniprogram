import {Radio as TaroRadio, View} from "@tarojs/components";
import React from "react";

type RadioPropsType = {
  checked: boolean
  onChange?:  (newValue: boolean) => void
  color?: string
  className?: string
}
const Radio:React.FC<RadioPropsType> = props => {
  return (<>
    <View
      className={props.className || ''}
      onClick={() => props.onChange && props.onChange(!props.checked)}
    >
      {
        props.checked && ( <TaroRadio checked color={props.color} /> )
      }
      {
        !props.checked && ( <TaroRadio color={props.color} /> )
      }
    </View>
  </>)
}

export default Radio
