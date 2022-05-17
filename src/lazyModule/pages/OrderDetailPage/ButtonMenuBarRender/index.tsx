import React from "preact/compat";
import {View} from "@tarojs/components";
import Button from "../../../../components/Button";
import {OrderPropsType} from "../Transaction";
import {navigateStoreDetail} from "../../../../store/module/router";

const BottomMenuBarRender: React.FC<OrderPropsType> = ({order}) => {
  const handleRedirectStore = () => {
    navigateStoreDetail(order.startStore.id)
  }

  return (<>
    <View>取车问题您可以直接联系门店</View>
    <Button type='primary'
      onClick={handleRedirectStore}
    >联系门店</Button>
  </>)
}

export default BottomMenuBarRender
