import {View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import style from './style.module.scss'
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

export enum CategoryType  {
  CATEGORY,
  RECOMMAND
}
export type ItemType = {id: number; name: string; miniPrice: number; type: CategoryType}
const List = ():React.ReactElement => {
  const items: ItemType[] = [
    {id: 0, name: '推荐', miniPrice: 0, type: CategoryType.RECOMMAND},
    {id: 1, name: '经济型', miniPrice: 117.5, type: CategoryType.CATEGORY},
    {id: 2, name: '舒适型', miniPrice: 118.5, type: CategoryType.CATEGORY},
    {id: 3, name: '精英型', miniPrice: 118.5, type: CategoryType.CATEGORY},
    {id: 4, name: 'SUV型', miniPrice: 222.5, type: CategoryType.CATEGORY},
    {id: 5, name: 'SUV型', miniPrice: 222.5, type: CategoryType.CATEGORY},
    {id: 6, name: '5-15座商务', miniPrice: 222.5, type: CategoryType.CATEGORY},
    {id: 7, name: '电动型', miniPrice: 222.5, type: CategoryType.CATEGORY},
    {id: 8, name: '高端车', miniPrice: 222.5, type: CategoryType.CATEGORY},
  ]
  return (
    <View className={style.main}>
      <LeftBar items={items} />
      <RightBar />
    </View>
  );
}

export default List;
