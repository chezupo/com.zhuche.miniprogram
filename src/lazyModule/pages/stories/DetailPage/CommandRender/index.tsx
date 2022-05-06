import React from "preact/compat";
import {Text, View} from "@tarojs/components";
// @ts-ignore
import style from './style.module.scss'
import LineRender from "../components/LineRender";
import Icon from "../../../../../components/Icon";
import ItemRender from "./ItemRender";
import {useEffect, useState} from "preact/hooks";
import {CommentItemType, StoreItemType} from "../../../../../typings";
import NotFound from "../../../../../components/NotFound";
import {getStoreComments} from "../../../../../api/store";

type CommandRenderPropsType = {
  store: StoreItemType
}
const CommandRender: React.FC<CommandRenderPropsType> = props => {
  const [comments, setComments] = useState<CommentItemType[]>([])
  const store = props.store
  useEffect(() => {
    getStoreComments(store.id).then(res => {
      setComments(res)
    }).catch(() => {

    })
  }, [])

  return (
    <View className={style.main}>
      <View className={style.header}>
        <View>门店评价<Text className={style.count}>({comments.length})</Text> </View>
        <Icon value='right' className={style.icon} />
      </View>
      <LineRender />
      <View className={style.commandWrapper}>
        { comments.length === 0 && <NotFound className={style.notFound} title='没有评论' /> }
        { comments.map((item, i) => <ItemRender
          key={i}
          data={item}
        /> ) }
      </View>
    </View>
  )
}

export default CommandRender
