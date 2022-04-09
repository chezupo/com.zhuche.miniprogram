import React from "react";
import {View} from "@tarojs/components";
import style from "./style.module.scss";

type LineRenderPropsType = {
  showFloatFlat?: boolean
  isActiveLine?: boolean
}

const lineWidth = 18;
const LineRender: React.FC<LineRenderPropsType> = props => {
return (
  <View
    className={[style.line, props.isActiveLine ? style.activeLine : ''].join(' ')}
    style={{width: `${lineWidth}vw`}}
  >
  </View>
  )
}
type FlagRenderPropsType = {
  title: string;
  onClick: () => void
  flagVisitable: boolean
}
const FlagRender: React.FC<FlagRenderPropsType> = props => {
  return (<View className={style.point} >
    {
      props.flagVisitable && (
        <View className={style.flag}>
          <View className={style.verticalLine} />
          <View className={style.verticalLine} />
          <View className={style.verticalLine} />
        </View>
      )
    }
    <View
      style={{width: `${lineWidth}vw`, left: `-${lineWidth / 2}vw`}}
      className={style.clickSpin}
      onClick={() => props.onClick()}
    >
    </View>
    <View className={style.title}>{props.title}</View>
  </View>)
}
type RangeRenderPropsType = {
  value?: [number?, number?]
  rangeValues: {title?: string; value: number}[]
  onChange?: (newValue: [number?, number?]) => void
}
const RangeRender: React.FC<RangeRenderPropsType> = props => {
  const handleChange = (newValue: number) => {
    let tmp: [number?, number?] = []
    switch(props.value.length) {
      case 2:
        tmp= [newValue]
        break;
      case 1:
        tmp = props.value[0] > newValue ? [newValue, props.value[0]] : [
          props.value[0],
          newValue
        ]
        break;
      case 0:
        tmp = [newValue]
        break;
    }
    props.onChange && props.onChange(tmp)
  }

  return (<>
    <View className={style.main}>
      {
        props.rangeValues.map((el, index) => (
          <>
            <FlagRender
              title={el.title || `${el.value}`}
              onClick={() => handleChange(el.value)}
              flagVisitable={props.value.includes(el.value)}
            />
            {index !== props.rangeValues.length - 1 && <LineRender
              isActiveLine={props.rangeValues.length > 0 && props.value.length === 2 && props.value[0] <= el.value && el.value < props.value[1]}
            />}
          </>
        ))
      }
    </View>
  </>)
}

export default RangeRender
