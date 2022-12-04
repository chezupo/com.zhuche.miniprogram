import * as React from "react";
import { View } from "@tarojs/components";
import { AtIndexes } from "taro-ui";
import style from "./style.module.scss";
import { useAppSelector } from "../../../../reduxStore";
import NotFound from "../../../../components/NotFound";

type IndexPropsType = {
  value: string;
  onChange: (city: CityType) => void;
};
const CityList: React.FC<IndexPropsType> = props => {
  const { value } = props;
  const city = useAppSelector(state => state.city);
  let list = city.list.map(el => ({
    title: el.key,
    key: el.key,
    items: el.list
  }));
  if (value.length > 0) {
    list = list
      .map(el => {
        return {
          ...el,
          items: el.items.filter(item => {
            const match = item.name.match(value) || item.pinyin.match(value);
            if (!!match) {
              return true;
            } else {
              return false;
            }
          })
        };
      })
      .filter(item => item.items.length > 0);
  }

  return (
    <View className={style.main}>
      {list.length === 0 && (
        <View className={style.notFoundWrapper}>
          <NotFound title="很抱歉，没有找到结果，您可以换个词试试。" />
        </View>
      )}
      {list.length > 0 && (
        <View className={style.city}>
          <AtIndexes list={list} onClick={props.onChange}></AtIndexes>
        </View>
      )}
    </View>
  );
};

export default CityList;
