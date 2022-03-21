import * as React from "react";
import {View} from "@tarojs/components";
import style from "./style.module.scss"
import Button from "../../../../components/Button";
import {NoteRenderPropsType} from "../NoteRender";


type ButtonRenderPropsType = {
  onReset: () => void
  onSubmit: () => void
} & NoteRenderPropsType
const ButtonRender: React.FC<ButtonRenderPropsType> = (props) => {
  const handleClick = () => {
    props.startTime && props.endTime && props.onSubmit()
  }
  let notice: string = ''
  if (props.endTime && props.startTime) {
    const hours =  (props.endTime.getTime() - props.startTime.getTime()) / (60 * 60 * 1000)
    notice += '共' + (hours / 24).toFixed(0) + '天'
    notice += hours % 24 > 0 ? hours % 24  + '小时' : ''
  }

  return (
    <View className={style.main}>
      <View>{props.endTime && props.startTime && (<> {notice} </>)}</View>
      <Button onClick={() => props.onReset && props.onReset()}>清空</Button>
      <Button
        type='primary'
        isDisable={!props.startTime || !props.endTime}
        onClick={handleClick}
      >确定</Button>
    </View>
  )
}

export default ButtonRender
