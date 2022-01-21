import {ReactChild, ReactChildren} from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"

type GroupContainerPropsType = {
  children: ReactChild | ReactChildren;
  title: string
}

const GroupContainer = (props: GroupContainerPropsType) => {
  return (<>
    <View className={style.title}>
      {props.title}
    </View>
    <View className={style.container}>
      {props.children}
    </View>
  </>)
}

export default GroupContainer;
