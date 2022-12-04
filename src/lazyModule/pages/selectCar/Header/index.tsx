import * as React from "react";
import { View } from "@tarojs/components";
import style from "./style.module.scss";
import { useAppSelector } from "../../../../reduxStore";
import { formatTimeNumber as format } from "../../../../util/helper";
import { parseDate } from "../../DateTimePicker/DatePicker/util";

const Header = (): React.ReactElement => {
  const {
    startStore,
    starTime: startTimestamp,
    endTime: endTimeStamp
  } = useAppSelector(state => state.order.createOrder);
  const { hours, minutes, date, month } = parseDate(new Date(startTimestamp));
  const endTime = parseDate(new Date(endTimeStamp));

  return (
    <View className={style.headerWrapper}>
      <View>
        {startStore.name}
        {startStore.mark.length > 0 ? <>{`(${startStore.mark})`}</> : <></>}
      </View>
      <View className={style.dateRange}>
        <View className={style.date}>
          {format(month)}-{format(date)} {format(hours)}:{format(minutes)}
        </View>
        <View className={style.dateRangeBetweenBorder} />
        <View className={[style.date, style.endDate].join(" ")}>
          <View>
            {" "}
            {format(endTime.month)}-{format(endTime.date)}{" "}
            {format(endTime.hours)}:{format(endTime.minutes)}{" "}
          </View>
          <View className={style.triangle} />
        </View>
      </View>
    </View>
  );
};

export default Header;
