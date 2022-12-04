import * as React from "react";
import { useEffect } from "react";
import { View } from "@tarojs/components";
import style from "./style.module.scss";
import { CityCategory } from "../../../../../store/module/cities";
import { selectorQueryClientRect } from "../../../../../nativeInterface/selectorQueryClientRect";

type CityGroupPropsType = {
  title: String;
  items: CityType[];
  keyIndex: string;
  id: number;
};
const CityGroup = (props: CityGroupPropsType): React.ReactElement => {
  const className = `dfafasfasdfas_${props.id}`;
  const isPopularCity =
    props.title === CityCategory.POPULAR ? { background: "white" } : {};
  const initStyle = () => {
    setTimeout(() => {
      selectorQueryClientRect("." + className)
        .then(res => {
          console.log(res);
          // dropdownRef.current.style.top = res.top + res.height + 'px';
          // handleClick(items[2])
        })
        .catch(e => {
          debugger;
          console.log(className);
          initStyle();
        });
    }, 20);
  };

  useEffect(() => initStyle(), [props.keyIndex]);

  return (
    <View className={[style.main, className].join(" ")} id={`${props.id}`}>
      <View className={style.locationLetter} style={isPopularCity}>
        {props.title}
      </View>
      <View className={style.cityNameGroup}>
        {props.items.map(i => (
          <View className={style.cityName} key={i.code}>
            {i.name}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CityGroup;
