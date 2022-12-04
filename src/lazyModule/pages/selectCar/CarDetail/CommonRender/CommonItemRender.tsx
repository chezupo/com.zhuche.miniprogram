import React from "react";
import { Image, View } from "@tarojs/components";
import style from "./style.module.scss";
import Icon from "../../../../../components/Icon";

type CommonItemRenderPropsType = {
  createdAt: string;
  content: string;
  images: string[];
};

const CommonItemRender: React.FC<CommonItemRenderPropsType> = props => {
  return (
    <>
      <View className={style.user}>
        {/*<Image*/}
        {/*  src={props.cover}*/}
        {/*  className={style.avatar}*/}
        {/*/>*/}
        {/*// todo 需要根据微信或支付的订单来区分用户头像*/}
        <Icon value="user" style={{ fontSize: "4vw" }} />
        <View className={style.infoWrapper}>
          <View className={style.nameWrapper}>
            {/*// todo 需要根据微信或支付的订单来区分用户昵称*/}
            <View className={style.key}>匿名用户</View>
            <View className={style.tag}>满意</View>
          </View>
          <View className={style.date}>{props.createdAt}</View>
        </View>
      </View>
      <View className={style.content}>{props.content}</View>
      <View className={style.imagesWrapper}>
        {props?.images?.length > 0 &&
          props.images.map((src, i) => (
            <Image key={i} src={src} className={style.image} mode="widthFix" />
          ))}
      </View>
    </>
  );
};

export default CommonItemRender;
