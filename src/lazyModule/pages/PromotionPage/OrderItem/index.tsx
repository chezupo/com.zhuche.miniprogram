import React from "react";
import { Text, View } from "@tarojs/components";
import style from "../style.module.scss";
import { orderStatusMayStr } from "../../../../util/orderUtil";
import { useAppSelector } from "../../../../reduxStore";

type OrderItemPropType = {
  order: OrderItemType;
};
const OrderItem: React.FC<OrderItemPropType> = props => {
  const me = useAppSelector(state => state.me.data);
  const { order } = props;
  let remark: string = "";
  let rate: number = 0;
  if (me) {
    if (order?.promotionLevel1User.id === me.id) {
      remark = "一级下线";
      rate = order.promotionLevel1;
    } else if (order?.promotionLevel2User.id === me.id) {
      remark = "二级下线";
      rate = order.promotionLevel2;
    }
  }
  const commission = ((order.amount * rate) / 100).toFixed(2);

  return (
    <>
      <View className={style.orderItemWrapper} key={order.id}>
        <View className={style.NoWrapper}>
          <View>单&emsp;号: {order.outTradeNo}</View>
          <View>{orderStatusMayStr[order.status]}</View>
        </View>
        <View className={style.item}>标&emsp;题: {order.title}</View>
        <View className={style.item}>
          用户名: {order.user.alipayAccount?.nickName}({remark})
        </View>
        <View className={style.item}>总租金: {order.amount.toFixed(2)}元</View>
        <View className={style.item}>返利点: {rate}%</View>
        <View className={style.item}>
          佣&emsp;金: <Text className={style.balance}>{commission}</Text>元
        </View>
        <View className={style.item}>时&emsp;间: {order.createdAt}</View>
      </View>
    </>
  );
};

export default OrderItem;
