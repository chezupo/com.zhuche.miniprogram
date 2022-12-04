import * as React from "react";
import { Image, View } from "@tarojs/components";
import searchSvg from "../../asesst/images/undraw_search_re_x5gq.svg";
import style from "../NotFound/style.module.scss";

type SearchNoticeBoardPropsType = {
  title?: string;
};
const SearchNoticeBoard: React.FC<SearchNoticeBoardPropsType> = props => {
  return (
    <View className={style.main}>
      <Image src={searchSvg} className={style.image} />
      <View className={style.title}>{props.title || "请输入城市"} </View>
    </View>
  );
};

export default SearchNoticeBoard;
