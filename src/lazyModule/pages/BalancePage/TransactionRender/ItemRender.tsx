import React from "preact/compat";
import {View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import {TransactionItemType} from "../../../../typings";
import {convertDate} from "../../../../util/Carlendar";

type ItemRenderPropsType = {
  data: TransactionItemType
}
const ItemRender: React.FC<ItemRenderPropsType> = props => {
  const {amount} = props.data
  const createdAt = new Date(props.data.createdAt)
  const seconds = createdAt.getSeconds();
  return (<>
    <View className={style.itemWrapper}>
      <View className={style.leftBar}>
        <View>{props.data.title}</View>
        <View className={style.subtitle}>{
          convertDate(new Date(
            createdAt
          ))
        }:{seconds > 9 ? seconds : `0${seconds}` }</View>
      </View>
      <View className={style.rightWrapper}>
        <View>{amount > 0 ? '+' : '-'} {amount.toFixed(2)}</View>
        <View className={style.subtitle}>余额 {props.data.balance.toFixed(2)}</View>
      </View>
    </View>
  </>)
}

export default ItemRender
