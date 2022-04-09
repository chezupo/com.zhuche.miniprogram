import * as React from "react";
import SelectorContainer from "./components/SelectContainer";
import OrderRender from "./OrderRender";
import BrandRender from "./BrandRender";
import PriceRender from "./PriceRender";
import MoreRender from "./MoreRender";

const Selector = (): React.ReactElement => {
  return (<SelectorContainer
    orderComponent={
      <OrderRender />
    }
    brandComponent={
      <BrandRender />
    }
    priceComponent={<PriceRender />}
    moreComponent={<MoreRender />}
  />
  )
}

export default Selector
