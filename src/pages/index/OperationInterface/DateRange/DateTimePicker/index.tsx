import * as React from "react";
import {useState} from "react";
import TimePicker from "./TimePicker";
import {View} from "@tarojs/components";
import style from "./style.module.scss"
import DatePicker from "./DatePicker";
import NoteRender from "./NoteRender";

type TimePickerType = {
  isVisitable: boolean
}
const DateTimePicker: React.FC<TimePickerType> = (props) => {
  const [startDate, setStartDate] = useState<Date | null>()
  const [endDate, setEndDate] = useState<Date | null>()
  const handleChangeStartDate = (newStartDate: Date | null) => {
    setStartDate(newStartDate)
  }
  const handleChangeEndDate = (newEndDate: Date | null) => {
    setEndDate(newEndDate)
  }

  return (
    <>

      <NoteRender />
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={handleChangeStartDate}
        onChangeEndDate={handleChangeEndDate}
      />
      <View className={style.timePickerWrapper}>
        <TimePicker title='取车时间' />
        <TimePicker title='取车时间' />
      </View>
    </>
  )
}

export default DateTimePicker
