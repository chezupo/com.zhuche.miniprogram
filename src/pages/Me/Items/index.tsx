import * as React from "react";
import ItemContainer, {ItemContainerType} from "./ItemContainner";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import Point from "../../../components/Point";
import {AtActionSheet, AtActionSheetItem} from "taro-ui";
import {useReducer, useState} from "react";
import {navigateTo, navigateToLoginOrRegister} from "../../../store/module/router";

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
  const items: ItemContainerType[] = [
    {title: '绑定公众号', icon: 'iconfont icon-wechat', note: <WechatNote title='待绑定' />} ,
    {title: '违章查询', icon: 'iconfont icon-weizhangshigujilu'} ,
    {title: '紧急联系人', icon: 'iconfont icon-lianxiren'} ,
    {title: '身份认证', icon: 'iconfont icon-shenfenzheng'} ,
    {title: '驾照认证', icon: 'iconfont icon-kaojiazhao'} ,
  ]
  const [isLogin, ] = useState<boolean>(false)
  const [isActionPanel, actionDispatch] = useReducer((state): boolean => !state, false)
  const handleClick = (item: ItemContainerType) => {
    if (!isLogin) actionDispatch()
  }
  const handleLoginOrRegister = ():void => {
    actionDispatch()
    navigateToLoginOrRegister()
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
      <AtActionSheet
        isOpened={isActionPanel}
        cancelText='取消'
        title='您还未登录，请登录后再试'
        onCancel={actionDispatch}
      >
        <AtActionSheetItem
          onClick={handleLoginOrRegister}
        >
          登录/注册
        </AtActionSheetItem>
      </AtActionSheet>
    </>
  )
}

export default Items
