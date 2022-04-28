import React from "preact/compat";
import {View} from "@tarojs/components";
import NotFound from "../../../components/NotFound";
// @ts-ignore
import style from './style.module.scss';

const ViolationPage: React.FC = () => {
  return (<>
    <View className={style.main}>
      <NotFound
        title='您没有违章记录'
      />
    </View>
  </>)
}

export default ViolationPage
