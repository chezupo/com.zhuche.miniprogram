import * as React from "react";
import {CSSProperties} from "react";
import * as Taro from "@tarojs/taro";
import {View} from "@tarojs/components";
import ItemContainer, {ItemContainerEventType, ItemContainerType} from "./ItemContainner";
// @ts-ignore
import style from "./style.module.scss"
import Point from "../../../components/Point";
import {
  navigateToContactPage,
  navigateToDriverLicenceValidationPage,
  navigateToIdCarValidationPage,
  navigateToLoginOrRegister, navigateToPromotionPage, navigateToTransactionPage,
  navigateToViolationPage
} from "../../../store/module/router";
import Icon from "../../../components/Icon";
import getPlatformType from "../../../util/platformType";
import {isLogin} from "../../../util/authUtil";

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
    {title: '我的账单', icon: <Icon value='transaction' style={iconStyle} />, eventType: ItemContainerEventType.TRANSACTION} ,
  ...(getPlatformType() === 'wechat' ? [
    {title: '绑定公众号', icon: <Icon value='wechat' style={{...iconStyle, fontSize: '6vw'}} />,eventType: ItemContainerEventType.WECHAT_OFFICE, note: <WechatNote title='待绑定' />, }
  ] : []),
    {title: '违章查询', icon: <Icon value='weizhangshigujilu' style={iconStyle} />, eventType: ItemContainerEventType.VIOLATION } ,
    {title: '紧急联系人', icon: <Icon value='lianxiren' style={iconStyle} />, eventType: ItemContainerEventType.CONTACT } ,
    {title: '身份认证', icon: <Icon value='shenfenzheng' style={iconStyle} />, eventType: ItemContainerEventType.ID_CAR } ,
    {title: '驾照认证', icon: <Icon value='kaojiazhao' style={iconStyle} />, eventType: ItemContainerEventType.DRIVER_S_LICENSE } ,
    {title: '我的推广', icon: <Icon value='promotion' style={iconStyle} />, eventType: ItemContainerEventType.PROMOTION} ,
  ]
  const handleClick = (item: ItemContainerType) => {
    if (!isLogin()) {
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
      return
    }
    switch (item.eventType) {
      // 定向到违章页
      case ItemContainerEventType.VIOLATION:
        navigateToViolationPage()
        break;
      // 定向到联系人页
      case ItemContainerEventType.CONTACT:
        navigateToContactPage()
        break;
      case ItemContainerEventType.ID_CAR:
        navigateToIdCarValidationPage();
        break
      case ItemContainerEventType.DRIVER_S_LICENSE:
        navigateToDriverLicenceValidationPage()
        break;
      case ItemContainerEventType.TRANSACTION:
        navigateToTransactionPage();
        break;
      case ItemContainerEventType.PROMOTION:
        navigateToPromotionPage()
        break
    }
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
