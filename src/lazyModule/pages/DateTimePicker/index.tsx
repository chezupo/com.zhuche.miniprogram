import * as React from "react";
import {View} from "@tarojs/components";
import {useEffect, useState} from "react";
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";
import NoteRender from "./NoteRender";
import ButtonRender from "./ButtonRender";
import {parseDate} from "./DatePicker/util";
import {messageObserve} from "../../../store/module/message";
import {useAppDispatch, useAppSelector} from "../../../reduxStore";
import {setTime} from "../../../reduxStore/module/order";
import {navigateToCheckoutOrder, navigateToHome} from "../../../store/module/router";
// @ts-ignore
import style from "./style.module.scss"
import {useRouter} from "@tarojs/taro";

const convertTimeToDate = (time: string, date: Date): Date  => {
  let {fullYear, month, date: newDate} = parseDate(date)
  const [newHours, newMinutes] = time.split(':').map(el => parseInt(el, 10))
  return new Date(fullYear, month, newDate, newHours, newMinutes)
}
type TimePickerType = {
  isVisitable: boolean
}
const DateTimePicker: React.FC<TimePickerType> = (props) => {
  const dispatch = useAppDispatch()
  const {createOrder} = useAppSelector(state => state.order)
  const [startDate, setStartDate] = useState<Date | null>(new Date(createOrder.starTime))
  const [endDate, setEndDate] = useState<Date | null>(new Date(createOrder.endTime))

  const [startTime, setStartTime] = useState<string>('')
  const [endTime, setEndTime] = useState<string>('')
  const handleChangeStartDate = (newStartDate: Date | null) => {
    setStartDate(newStartDate)
  }
  // 监听时间变动并处理
  useEffect(() => {
    if (startDate && startTime) {
      const newDate = convertTimeToDate(startTime, startDate)
      newDate.getTime() !== startDate.getTime() && setStartDate(newDate)
    }
    if (endDate && endTime ) {
      const newDate = convertTimeToDate(endTime, endDate)
      newDate.getTime() !== endDate.getTime() && setEndDate(newDate)
    }
  }, [startTime, endTime, startDate, endDate])
  const handleChangeEndDate = (newEndDate: Date | null) => {
    setEndDate(newEndDate)
  }
  const handleReset = () => {
    setEndDate(null)
    setStartDate(null)
  }
  const {params} = useRouter()
  const handleSubmit = () => {
    if ( endDate.getTime() - startDate.getTime() < 60 * 60 * 1000 ) {
      messageObserve.next({
        title: '租车时长不能少于小时',
        type: 'error'
      })
    } else {
      dispatch(setTime({
        startTime: startDate.getTime(),
        endTime: endDate.getTime()
      }))
      params.isRebook ? navigateToCheckoutOrder() :  navigateToHome()
    }
  }

  return (
    <>
      <NoteRender
        startTime={startDate}
        endTime={endDate}
      />
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
      />
      <View className={style.timePickerWrapper}>
        <TimePicker title='取车时间' onChange={setStartTime} />
        <TimePicker title='还车时间' onChange={setEndTime} />
      </View>
      <ButtonRender
        onSubmit={handleSubmit}
        onReset={handleReset}
        startTime={startDate}
        endTime={endDate}
      />
    </>
  )
}

export default DateTimePicker
