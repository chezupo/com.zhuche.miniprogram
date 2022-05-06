import React from "preact/compat";
import {Image, View, Text} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import {CommentItemType} from "../../../../../../typings";

type ItemRenderPropsType = {
  data: CommentItemType
}
const ItemRender: React.FC<ItemRenderPropsType> = props => {
  let phone = props.data.order.user.alipayAccount.phone;
  phone = phone.substring(0, 3) + "****" + phone.substring(7)
  let avatar = props.data.order.user.alipayAccount.avatar
  return (
    <View className={style.main}>
      <View className={style.userWrapper}>
        <Image
          src={avatar}
          className={style.avatar}
        />
        <View className={style.infoWrapper}>
          <View className={style.nameWrapper}>
            <View>{phone}</View>
            <View className={style.tag}>满意</View>
          </View>
          <View className={style.date}>{props.data.createdAt}</View>
        </View>
      </View>
      <View className={style.command}>{props.data.content}</View>
    </View>
  )
}

export default ItemRender
