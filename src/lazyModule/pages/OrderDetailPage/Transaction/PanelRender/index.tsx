import React from "react";
import taro from "@tarojs/taro";
import { PickerView, PickerViewColumn, View } from "@tarojs/components";
import { useEffect, useState } from "preact/hooks";
import style from "./style.module.scss";
import { convertDateToStr } from "../../../../../util/dateUtil";
import Button from "../../../../../components/Button";

type PanelRendererPropsType = {
  order: OrderItemType;
  onCancel: () => void;
  onSubmit: (days: number) => void;
};
const PanelRenderer: React.FC<PanelRendererPropsType> = ({
  order,
  ...props
}) => {
  const [days, setDays] = useState<number[]>([]);
  const [value, setValue] = useState<[number]>([0]);
  useEffect(() => {
    const initYear: number[] = [];
    for (let i = 1; i <= 30; i++) {
      initYear.push(i);
    }
    setDays(initYear);
  }, []);
  const getDay = (): number => days[value[0]];
  const [amount, setAmount] = useState<number>(0.0);
  const [expired, setExpired] = useState<number>(order.endTimeStamp);
  const setRelateData = () => {
    if (getDay()) {
      const insuranceFee: number = order.isInsurance
        ? order.car.insuranceFee * getDay()
        : 0;
      setAmount(
        Math.round(order.car.rent * getDay() * 100 + insuranceFee * 100) / 100.0
      );
      setExpired(order.endTimeStamp + getDay() * 60 * 60 * 24 * 1000);
    }
  };
  useEffect(() => setRelateData(), [value, days]);
  const timestampCoverToDateStr = (): string =>
    convertDateToStr(new Date(expired));
  const handleSubmit = async () => {
    if (getDay() === 0) {
      await taro.showToast({ title: "续租时间不能为空" });
      return;
    }
    props.onSubmit(getDay());
  };

  return (
    <>
      <View className={style.main}>
        <View className={style.title}>续租</View>
        <PickerView
          indicatorClass={style.indicator}
          className={style.picker}
          value={value}
          onChange={e => setValue([e.detail.value[0]])}
        >
          <PickerViewColumn>
            {days.map(item => {
              return <View style={{ textAlign: "center" }}>{item}天</View>;
            })}
          </PickerViewColumn>
        </PickerView>
        <View className={style.itemWrapper}>
          <View>费用: ￥{amount.toFixed(2)}</View>
          <View>到期时间: {timestampCoverToDateStr()}</View>
        </View>

        <View className={style.buttonWrapper}>
          <Button onClick={props.onCancel}>取消</Button>
          <Button type="primary" onClick={handleSubmit}>
            确定
          </Button>
        </View>
      </View>
    </>
  );
};

export default PanelRenderer;
