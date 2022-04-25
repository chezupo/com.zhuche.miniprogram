import React from "preact/compat";
import {Image, View} from "@tarojs/components";
import SpinContainer from "../SpinContainer";
import loadingSvg from "../../asesst/images/loading.svg"
import style from './style.module.scss';

const Loading: React.FC = () => {
  return (
    <SpinContainer>
      <View className={style.main}>
        <Image
          src={loadingSvg}
          className={style.image}
        />
        <View className={style.text}>加载中...</View>
      </View>
    </SpinContainer>
  )
}

export default Loading
