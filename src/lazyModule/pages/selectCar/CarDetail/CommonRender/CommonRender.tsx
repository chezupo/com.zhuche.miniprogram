import React from 'react';
import {useEffect, useState} from "preact/hooks";
import {Text, View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss";
import CommonItemRender from "./CommonItemRender";
import {CommentItemType} from "../../../../../typings";
import {getCarComments} from "../../../../../api/cars";
import EmptyRender from "../../../stories/SearchResultRender/EmptyRender";
import NotFound from "../../../../../components/NotFound";

export type CommonTagItemType = {
  name: string
  total: number
}

type CommonRenderPropsType = {
  commonTags: CommonTagItemType[]
  id: number
}
type ActiveCommentsType = {
  flag: string
  comments: CommentItemType[]
}

const flagMapComments:Map<string, CommentItemType[]> = new Map<string, CommentItemType[]>();
const allFlag = '全部'
const CommonRender: React.FC<CommonRenderPropsType> = props => {
  const [activeComments, setActiveComments] = useState<ActiveCommentsType>({flag: allFlag, comments: []})
  const [total, setTotal] = useState<number>(0)
  useEffect(() => {
    getCarComments(props.id).then(comments => {
      setTotal(comments.length)
      flagMapComments.set("全部", comments)
      comments.forEach(item => {
        const key = item.flag;
        if (flagMapComments.has(key)) {
          const oldComments = flagMapComments.get(key);
          flagMapComments.set(key, [...oldComments, item])
        } else {
          flagMapComments.set(key, [item])
        }
      })
      setActiveComments({
        flag: allFlag,
        comments: comments
      })
    })
  }, [])
  const handleChange = (flag: string) => {
    setActiveComments({
      flag,
      comments: flagMapComments.get(flag)
    })

  }

  return (
    <View className={style.containerWrapper}>
      <View className={style.comment}>
        <View className={style.key}>用户评价</View>
        {
          total > 0 && <View className={style.relate}>满意度: <Text className={style.text}>100%</Text></View>
        }
      </View>
      <View className={style.tagsWrapper}>
        {
          Array.from(flagMapComments.keys()).map((flag, i) => {
            const comments = flagMapComments.get(flag)
            return (
              <View
                key={i}
                className={style.tag}
                onClick={() => handleChange(flag)}
              >{flag}({comments.length})</View>
            )
          } )
        }
      </View>
      { activeComments.comments.length === 0 && <NotFound /> }
      { activeComments.comments.length > 0 &&
        activeComments.comments.map(comment => ( <CommonItemRender
          key={comment.id}
          images={comment.images}
          createdAt={comment.createdAt}
          content={comment.content}
        /> ))
      }
    </View>
  )
}

export default CommonRender
