import * as React from "react";
import ItemContainer, {ItemContainerType} from "./ItemContainner";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import Point from "../../../components/Point";
import {AtActionSheet, AtActionSheetItem} from "taro-ui";
import {CSSProperties, useReducer, useState} from "react";
import {navigateTo, navigateToLoginOrRegister} from "../../../store/module/router";
import useObserve from "../../../util/useObserve";
import {useAppStoreSelector} from "../../../store";
import * as Taro from "@tarojs/taro";
import Icon from "../../../components/Icon";

type NotePropstype = {title: string}
const WechatNote = (props: NotePropstype): React.ReactElement => {
  return (
    <View className={style.wechatNoteWrapper}>
      <Point borderSize={2} color='red' />
      <View className={style.wechatNote}>
        {props.title}
      </View>
    </View>
  )
}

const Items = (): React.ReactElement => {
  const  iconStyle: CSSProperties = {fontSize: '5vw'}
  const items: ItemContainerType[] = [
    {title: '绑定公众号', icon: <Icon value='wechat' style={{...iconStyle, fontSize: '6vw'}} />, note: <WechatNote title='待绑定' />} ,
    {title: '违章查询', icon: <Icon value='weizhangshigujilu' style={iconStyle} />} ,
    {title: '紧急联系人', icon: <Icon value='lianxiren' style={iconStyle} />} ,
    {title: '身份认证', icon: <Icon value='shenfenzheng' style={iconStyle} />} ,
    {title: '驾照认证', icon: <Icon value='kaojiazhao' style={iconStyle} />} ,
  ]
  const handleClick = (item: ItemContainerType) => {
    Taro.showModal({
      title: '消息提示',
      content: '您还未登录，无法进行操作, 是否前去登录？',
      success: (res) => {
        if (res.confirm) {
          navigateToLoginOrRegister()
        } else {
          console.log("not")
        }
      }
    })
  }

  return (
    <>
      <View className={style.main}>
        {items.map((item, key) => (
          <ItemContainer
            data={item}
            onClick={handleClick} key={key}
            className={items.length === key + 1 ? style.item : ''}
          />
        ))}
      </View>
    </>
  )
}

export default Items
