import * as React from "react";
import {ScrollView, View} from "@tarojs/components";
import style from "./style.module.scss"
import DaysRender from "./DaysRender/DaysRender";
import {getNextMonthTime, timeToDateTime, timeToMonthTime} from "./util";
import {useEffect, useState} from "react";

type DatePickerPropsType = {
  startDate?: Date
  endDate?: Date
  onChangeStartDate: (newStartDate:  Date | null) => void
  onChangeEndDate: (newEndDate: Date | null) => void
  className?: string
}
const DatePicker: React.FC<DatePickerPropsType> = (props) => {
  const {startDate, endDate} = props
  const handleChange = (date: Date) => {
    // 判定为取车日期
    if (!startDate && !endDate) {
      props.onChangeStartDate(date)
      return
    }
    // 判定为取车日期并重置还车日期
    if (startDate && endDate) {
      props.onChangeStartDate(date)
      props.onChangeEndDate(null)
      return
    }
    // 判定为取车时间
    if (startDate && !endDate) {
      if (timeToDateTime(date).getTime() < timeToDateTime(startDate).getTime() ) {
        props.onChangeStartDate(date)
      } else {
        props.onChangeEndDate(date)
      }
    }
  }
  const [months, setMonths] = useState<{year: number; month: number}[]>([])

  useEffect(() => {
    let startTime: Date = props.startDate ? timeToMonthTime(props.startDate) : new Date()
    let newMonths: {year: number; month: number}[] = []
    for (let i: number = 0; i <= 5; i++) {
      newMonths.push({
        month: startTime.getMonth(),
        year: startTime.getFullYear()
      })
      startTime = getNextMonthTime(startTime)
    }
    setMonths(newMonths)
  }, [])

  return (
    <>
      <View className={[props.className || '', style.main].join(' ')}>
        <View className={style.week}>
          <view>日</view>
          <view>一</view>
          <view>二</view>
          <view>三</view>
          <view>四</view>
          <view>五</view>
          <view>六</view>
        </View>
        <View className={style.scrollWrapper}>
          <ScrollView
            className={style.scroll}
            scrollY
            scrollWithAnimation
          >
            {
              months.map((el) => (
                <DaysRender
                  onClickDate={handleChange}
                  month={el.month}
                  year={el.year}
                  startDate={props.startDate}
                  endDate={props.endDate}
                />
              ))
            }
          </ScrollView>
        </View>
      </View>
    </>
  )

}

export default DatePicker
