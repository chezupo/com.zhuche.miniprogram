import React, { useState } from "react";
import { View } from "@tarojs/components";
import RangeRender from "../../../../../components/RangeRender";
import ContainerWithButtons from "../components/ContainerWithButtons";
import style from "./style.module.scss";
import ItemContainer from "../components/ItemContainer/ItemContainer";
import ItemRender from "../components/ItemRender";

const PriceRender: React.FC = () => {
  const infiniteNum = 400;
  const [value, setValue] = useState<[number?, number?]>([]);
  const items: {
    title?: string;
    rangeValues: [number?, number?];
  }[] = [
    { rangeValues: [], title: "无限" },
    { rangeValues: [0, 150] },
    { rangeValues: [150, 250] },
    { rangeValues: [250, 350] },
    { rangeValues: [350, infiniteNum] }
  ];

  return (
    <ContainerWithButtons>
      <View className={style.main}>
        <ItemContainer title="租金" className={style.priceContainer}>
          {items.map((el, i) => (
            <ItemRender
              onClick={() => setValue(el.rangeValues)}
              isActive={
                JSON.stringify(el.rangeValues) === JSON.stringify(value)
              }
              key={i}
              title={el.title || `${el.rangeValues[0]}-${el.rangeValues[1]}`}
            />
          ))}
        </ItemContainer>
        <ItemContainer title="更多范围">
          <RangeRender
            value={value}
            onChange={setValue}
            rangeValues={[
              { value: 0 },
              { value: 150 },
              { value: 250 },
              { value: 350 },
              { value: infiniteNum, title: "无限" }
            ]}
          />
        </ItemContainer>
      </View>
    </ContainerWithButtons>
  );
};

export default PriceRender;
