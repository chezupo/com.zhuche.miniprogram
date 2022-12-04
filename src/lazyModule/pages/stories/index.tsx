import * as Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import style from "./style.module.scss";
import Search from "./Search";
import List from "./List";
import { useAppSelector } from "../../../reduxStore";
import { StartStoreOrEndStoreType } from "../../../reduxStore/module/order";
import SearchResultRender from "./SearchResultRender";

const Stories = (): React.ReactElement => {
  const [keyword, setKeyword] = useState<string>("");
  const { createOrder } = useAppSelector(state => state.order);
  const [isSearchModel, setIsSearchModel] = useState<boolean>(false);
  const handleChange = (newKeyword: string) => {
    setKeyword(newKeyword);
  };
  useEffect(() => {
    let title: string = "";
    switch (createOrder.startStoreOrEndStore) {
      case StartStoreOrEndStoreType.END:
        title = `选择${createOrder.endCity.name}的门店`;
        break;
      case StartStoreOrEndStoreType.START:
        title = `选择${createOrder.startCity.name}的门店`;
        break;
    }
    title && Taro.setNavigationBarTitle({ title });
  }, []);
  return (
    <View className={style.main}>
      <View className={style.header}>
        <Search
          onChange={handleChange}
          value={keyword}
          onCancel={() => {
            setKeyword("");
            setIsSearchModel(false);
          }}
          onChangeModel={() => setIsSearchModel(true)}
          isSearchMode={isSearchModel}
          onClickMapButton={() => {}}
        />
      </View>
      <View className={style.body}>
        {!isSearchModel && <List />}
        {isSearchModel && <SearchResultRender value={keyword} />}
      </View>
    </View>
  );
};

export default Stories;
