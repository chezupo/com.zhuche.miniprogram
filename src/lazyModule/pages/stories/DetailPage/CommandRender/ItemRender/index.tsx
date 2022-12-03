import React from "preact/compat";
import {Image, View, Text} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';

type ItemRenderPropsType = {
  data: CommentItemType
}
const ItemRender: React.FC<ItemRenderPropsType> = props => {
  // let phone: string ? = props.data.order.user.alipayAccount.phone;
  let phone: string = '';
  let avatar: string = '';
  switch (props.data.order.payType) {
    case 'WECHAT':
      phone = props.data.order.user.wechatAccount.phone;
      avatar = props.data.order.user.wechatAccount.avatar
      break;
    case 'ALIPAY':
      phone = props.data.order.user.alipayAccount.phone;
      avatar = props.data.order.user.alipayAccount.avatar
      break;
  }

  if (phone.length == 11) {
    phone = phone.substring(0, 3) + "****" + phone.substring(7)
  }
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
