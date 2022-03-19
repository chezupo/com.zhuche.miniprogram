// @ts-ignore
import React from "react"
import {Image, View} from "@tarojs/components";
// @ts-ignore
import notfound from '../../asesst/images/undraw_not_found_-60-pq.svg'
// @ts-ignore
import style from './style.module.scss';

type NotFoundPropsType = {
    title?: string
    style?: Record<string, string>
}
const NotFound = (props: NotFoundPropsType): React.ReactElement => {
  return (
    <View className={style.main} style={{...(props.style ? {...props.style} : {})}} >
      <Image src={notfound} className={style.image} />
      <View className={style.title}>{props.title ? props.title : '没有数据'}</View>
    </View>
  )
}

export default NotFound
