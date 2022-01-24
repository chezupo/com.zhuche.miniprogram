import * as React from "react";
import SelectorContainer from "./SelectContainer";
// eslint-disable-next-line import/first
import {View} from "@tarojs/components";
import OrderRender from "./OrderRender";
import BrandRender from "./BrandRender";

const Selector = (): React.ReactElement => {
  return (<SelectorContainer
    orderComponent={
      <OrderRender />
    }
    brandComponent={
      <BrandRender />
    }
    priceComponent={<View>3</View>}
    moreComponent={<View>4</View>}
  />
  )
}

export default Selector
