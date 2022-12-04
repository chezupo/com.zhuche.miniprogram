import * as React from "react";
import { View } from "@tarojs/components";
import OrderItem from "../../OrderContainer";
import style from "../../style.module.scss";
import NotFound from "../../../../components/NotFound";
import { OrderCategoryType } from "../../index";

type TabContainerPropsType = {
  items: OrderItemType[];
  orderCategory: OrderCategoryType;
  onCancel: (value: OrderItemType) => void;
  onReturnCar: (value: OrderItemType) => void;
  onDeleteOrder: (value: OrderItemType) => void;
  onComment: (value: OrderItemType) => void;
  onPayOverTimeFeeAndReturnCared: (value: OrderItemType) => void;
  onPayed: (value: OrderItemType) => void;
};
const TabContainer: React.FC<TabContainerPropsType> = props => {
  return (
    <>
      <View className={style.orderListWrapper}>
        {props.items.length === 0 && (
          <View className={style.emptyWrapper}>
            <NotFound title="暂无订单" />
          </View>
        )}
        {props.items.length > 0 && (
          <>
            {props.items.map(order => (
              <OrderItem
                onComment={props.onComment}
                onReturnCar={props.onReturnCar}
                onDeleteOrder={props.onDeleteOrder}
                onCancel={props.onCancel}
                key={order.id}
                data={order}
                onPayOverTimeFeeAndReturnCared={
                  props.onPayOverTimeFeeAndReturnCared
                }
                orderCategory={props.orderCategory}
                onPayed={props.onPayed}
              />
            ))}
            <View className={style.bottom}>-- 到底了--</View>
          </>
        )}
      </View>
    </>
  );
};

export default TabContainer;
