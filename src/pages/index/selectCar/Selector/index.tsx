import * as React from "react";
import SelectorContainer from "./SelectContainer";
// eslint-disable-next-line import/first
import {View} from "@tarojs/components";

const Selector = (): React.ReactElement => {
  return (<SelectorContainer
    orderComponent={<View>1</View>}
    brandComponent={<View>2</View>}
    priceComponent={<View>3</View>}
    moreComponent={<View>4</View>}
  />
  )
}

export default Selector
