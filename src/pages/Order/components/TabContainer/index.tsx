import * as React from "react";
import {View} from "@tarojs/components";
import {OrderItemType} from "../../../../typings";
import OrderItem from "../../OrderContainer";
// @ts-ignore
import style from "../../style.module.scss";
import NotFound from "../../../../components/NotFound";
import {OrderCategoryType} from "../../index";

type TabContainerPropsType = {
  items: OrderItemType[]
  orderCategory:OrderCategoryType
  onCancel: (value: OrderItemType) => void
}
const TabContainer: React.FC<TabContainerPropsType> = props => {
  return (
  <View className={style.orderListWrapper}>
    {
      props.items.length === 0 && (
        <View className={style.emptyWrapper}>
          <NotFound
            title='暂无订单'
          />
        </View>
      )
    }
    {
      props.items.length > 0 && (
        <>
          {
            props.items.map(order => (
              <OrderItem
                onCancel={props.onCancel}
                key={order.id}
                data={order}
                orderCategory={props.orderCategory}
              />
            ))
          }
          <View className={style.bottom}>-- 到底了--</View>
        </>
      )
    }
  </View>
)


}

export default TabContainer
