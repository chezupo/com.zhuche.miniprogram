import {View} from "@tarojs/components";
import * as React from "react";
import {useEffect, useState} from "react";
import Tabs from "./Tabs";
// @ts-ignore
import style from "./style.module.scss"
import OrderContainer from "./OrderContainer";
import useObserve from "../../util/useObserve";
import {useAppStoreSelector} from "../../store";
import {navigateToLoginOrRegister} from "../../store/module/router";

export type OrderCategoryType = {id: number; name: string}

const tabs: OrderCategoryType[] = [
  {id: 1, name: '预约中'},
  {id: 2, name: '候补中'},
  {id: 3, name: '租赁中'},
  {id: 4, name: '已完成'},
  {id: 5, name: '已取消'},
]
const Order = () : React.ReactElement => {
  const [activeId, setActiveId] = useState<number>(1)

  return (<>
    <Tabs
      tabs={tabs}
      activeId={activeId}
      onChange={(changeActiveId) => setActiveId(changeActiveId)}
    />
      <View className={style.orderListWrapper}>
        <OrderContainer />
        <OrderContainer />
        <OrderContainer />
        <OrderContainer />
      </View>

    </>)
}

export default Order
