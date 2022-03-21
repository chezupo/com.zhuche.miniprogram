import * as React from "react";
import {useState} from "react";
import {AtTextarea} from "taro-ui";
// @ts-ignore
import {Input, View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss';
import {replaceStr} from "../../../util/helper";
import CarContainer from "./CarContainer";
import ServicePhone from "./ServicePhone";

const ComplaintFeedback = (): React.ReactElement => {
  const tags: {id: number; name: string}[] = [
    {id: 1, name: '自驾租车订单'},
    {id: 2, name: '门店/车辆相关'},
    {id: 3, name: '押金相关'},
    {id: 4, name: '违章相关'},
    {id: 5, name: '发票相关'},
    {id: 6, name: '软件相关'},
    {id: 7, name: '自驾游相关'},
    {id: 8, name: '其它'}
  ]
  const [activeTagId, setActiveTagId] = useState<number>(null)
  const replacePhone = (phone: string): string => {
    return replaceStr(phone, 3, 4, '*')
  }
  const [content, setContent] = useState<string>('')


  return (<View className={style.main}>

    <CarContainer
      name='选择问题反馈类型(必填)'
    >
      <>
        {tags.map((tag, key) => (
          <View
            className={[style.button, tag.id === activeTagId ? style.activeTag : ''].join(' ')}
            onClick={() => setActiveTagId(tag.id)}
            key={key}
          >{tag.name}</View>
        ))}
      </>
    </CarContainer>
    <CarContainer
      name='问题意见描述(必填)'
    >
      <View className={style.textAreaWrapper}>
        <AtTextarea
          value={content}
          placeholder='请输您的反馈意见或问题描述，以便我们能更好的帮助您解决问题'
          className={style.textArea}
          onChange={(e) => setContent(e)}
          maxLength={300}
        />
      </View>
    </CarContainer>

    <CarContainer name='联系方式' >
      <View className={style.contactWrapper}>
        <View className={style.contactItem}>{replacePhone('12345678901')}</View>
        <Input
          className={style.contactItem}
          name='email'
          placeholder='邮箱(选填)'
        />
      </View>
    </CarContainer>
    <ServicePhone />
    <View className={style.buttonWrapper}>
      <View className={style.submitButton}>提交</View>
    </View>
  </View>)
}

export default ComplaintFeedback
