import { View } from "@tarojs/components";
import taro from "@tarojs/taro";
import { useEffect, useState } from "preact/hooks";
import * as React from "react";
import style from "./style.module.scss";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import { useAppDispatch, useAppSelector } from "../../../../reduxStore";
import { getCarsThunk } from "../../../../reduxStore/module/cars";

export enum CategoryType {
  CATEGORY,
  RECOMMAND
}
export type ItemType = {
  id: number;
  name: string;
  miniPrice: number;
  type: CategoryType;
  cars: CarItemType[];
};

const List = (): React.ReactElement => {
  const { categories, list, loading } = useAppSelector(state => state.cars);
  const [showCars, setShowCars] = useState<CarItemType[]>([]);
  const { createOrder } = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (loading) {
      taro.showLoading({ title: "汽车加载中..." });
    } else {
      taro.hideLoading();
    }
  }, [loading]);
  useEffect(() => {
    if (list.length === 0 && createOrder.startStore?.id) {
      dispatch(getCarsThunk(createOrder.startStore.id)).then(() => {
        console.log("Get cars.");
      });
    }
    setShowCars(list);
  }, []);
  useEffect(() => {
    if (showCars.length === 0 && list.length > 0) setShowCars(list);
  }, [list]);

  const items: ItemType[] = [
    {
      id: 0,
      name: "推荐",
      miniPrice: 0,
      type: CategoryType.RECOMMAND,
      cars: list
    }
  ];
  categories.forEach(({ id, name, cars, price }) => {
    items.push({
      id,
      miniPrice: price,
      name,
      type: CategoryType.CATEGORY,
      cars
    });
  });
  return (
    <View className={style.main}>
      <LeftBar items={items} onChange={setShowCars} />
      <RightBar cars={showCars} />
    </View>
  );
};

export default List;
