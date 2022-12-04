import React from "react";
import { Image, Text, View } from "@tarojs/components";
import Container from "../components";
import Point from "../../../../components/Point";
import { primaryThemeColor } from "../../../../global";
import Icon from "../../../../components/Icon";
import style from "./style.module.scss";
import { TimestampType } from "../../../../reduxStore/module/order";
import { convertDate } from "../../../../util/Carlendar";

type CarPropsType = {
  className?: string;
  data: CarItemType;
  startStore: StoreItemType;
  endStore: StoreItemType;
  startTime: TimestampType;
  endTime: TimestampType;
};
const Car: React.FC<CarPropsType> = props => {
  const { data, startStore, endStore } = props;
  const startTime = new Date(props.startTime);
  const endTime = new Date(props.endTime);

  return (
    <Container className={[style.main, props.className || ""].join(" ")}>
      <View className={style.baseInfo}>
        <Image src={data.cover} className={style.image} mode="widthFix" />
        <View className={style.info}>
          <View className={style.name}>{data.name}</View>
          <View className={style.tags}>
            {data.shift === "AUTO" ? "自动" : "手动"} | {data.seats}座
          </View>
        </View>
      </View>
      <View className={style.storeWrapper}>
        <View className={style.lineWrapper}>
          <Point color="#F57015" borderSize={3} />
          <View className={style.line} />
          <Point color={primaryThemeColor} borderSize={3} />
        </View>
        <View className={style.storeNameWrapper}>
          <View className={style.storeName}>
            <View className={style.name}>
              <View>
                {startStore.city.name}-{startStore.name}{" "}
              </View>
              <Icon value="right" className={style.icon} />
            </View>
            <View className={style.date}>
              {convertDate(new Date(startTime))}
            </View>
          </View>
          <View className={style.storeName}>
            <View className={style.name}>
              <View>
                {endStore.city.name}-{endStore.name}{" "}
              </View>
              <Icon value="right" className={style.icon} />
            </View>
            <View className={style.date}>{convertDate(new Date(endTime))}</View>
          </View>
        </View>
      </View>
      {!!data.comments?.length && (
        <View className={style.commentWrapper}>
          <View className={style.rateWrapper}>
            <Text className={[style.rate, style.color].join(" ")}>100</Text>
            <Text className={style.color}>%</Text>满意
          </View>
          <View className={style.comment}>
            <View>
              共有<Text className={style.color}>{data.comments.length}</Text>
              条用户评价
            </View>
            <Icon value="right" className={style.icon} />
          </View>
        </View>
      )}
    </Container>
  );
};

export default Car;
