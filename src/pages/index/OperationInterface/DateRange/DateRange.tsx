import {View} from "@tarojs/components";
import React, {useState} from "react";
import style from "./style.module.scss";
import DateItem from "./DateItem";


const DateRange = (): React.ReactElement => {
  const [isOpened, setIsOpened] = useState<boolean>(true)
  const [title, setTitle] = useState<string>('')
  const handleClickStarTime = (): void => {
    setTitle('选择取车时间')
    setIsOpened(true)
  }
  const handleClickEndTime = (): void => {
    setTitle('选择还车时间')
    setIsOpened(true)
  }

  return (
    <>
      <View className={style.main}>
        <View />
        <View className={style.container}>
          <DateItem
            onClick={() => handleClickStarTime()}
          />
          <View className={style.item2}>2天</View>
          <DateItem
            onClick={() => handleClickEndTime()}
            className={style.item3}
          />
        </View>
      </View>
    </>
  )
}

export default DateRange

