import * as React from "react";
import {View} from "@tarojs/components";
import style from "./style.module.scss"
import SearchNoticeBoard from "../../../../components/SearchNoticeBoard";

const NotFoundRender: React.FC = () => {
  return (
    <View className={style.emptyWrapper}>
      <View>
        result
      </View>
    </View>
  )
}


const EmptyNoticeRender: React.FC = () => {
  return (
    <View className={style.emptyWrapper}>
      <SearchNoticeBoard title='请输入搜索关键词'   />
    </View>
  )
}

export {EmptyNoticeRender}
export default NotFoundRender
