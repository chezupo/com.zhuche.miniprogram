import React from "preact/compat";
import taro from "@tarojs/taro";
import { Image, View } from "@tarojs/components";
import Card from "../components/Card";
import style from "./style.module.scss";
import Icon from "../../../../components/Icon";
import Point from "../../../../components/Point";
import { primaryThemeColor } from "../../../../global";
import { OrderPropsType } from "../Transaction";
import {
  navigateStoreDetail,
  navigateToCarDetailPage
} from "../../../../store/module/router";

const Car: React.FC<OrderPropsType> = ({ order }) => {
  const handleDetail = () => {
    navigateToCarDetailPage(order.car.id);
  };
  const handleClickLocation = (
    latitude: number,
    longitude: number,
    address: string,
    name: string
  ) => {
    taro
      .openLocation({
        longitude,
        latitude,
        name,
        scale: 15,
        address
      })
      .then(() => {
        console.log("go to store locations");
      });
  };

  return (
    <>
      <Card>
        <View className={style.carInfoWrapper}>
          <View>
            <Image src={order.cover} mode="widthFix" className={style.image} />
          </View>
          <View className={style.infoWrapper}>
            <View className={style.title}>
              <View>{order.car.name}</View>
              <View className={style.detail} onClick={handleDetail}>
                <View>车辆详情</View>
                <Icon value="right" />
              </View>
            </View>
            <View>
              {order.car.type} / {order.car.seats}座 / {order.car.gasVolume}L
            </View>
          </View>
        </View>
        <View className={style.addressItemWrapper}>
          <View className={style.itemWrapper}>
            <View className={style.address}>
              <View className={style.itemNameWrapper}>
                <Point borderSize={4} color={primaryThemeColor} />
                <View className={style.direct}>取</View>
              </View>
              <View
                onClick={() => navigateStoreDetail(order.startStore.id, true)}
              >
                <View>店员免费送车上门</View>
                <View>{order.startStore.address}</View>
              </View>
            </View>
            <Icon
              value="location"
              className={style.location}
              onClick={() =>
                handleClickLocation(
                  order.startStore.lat,
                  order.startStore.lng,
                  order.startStore.address,
                  order.startStore.name
                )
              }
            />
          </View>
          <View className={style.itemWrapper}>
            <View className={style.address}>
              <View className={style.itemNameWrapper}>
                <Point borderSize={4} />
                <View className={style.direct}>还</View>
              </View>
              <View
                onClick={() => navigateStoreDetail(order.endStore.id, true)}
              >
                <View>店员免费送车上门</View>
                <View>{order.endStore.address}</View>
              </View>
            </View>
            <Icon
              value="location"
              className={style.location}
              onClick={() =>
                handleClickLocation(
                  order.endStore.lat,
                  order.endStore.lng,
                  order.endStore.address,
                  order.endStore.name
                )
              }
            />
          </View>
        </View>
      </Card>
    </>
  );
};

export default Car;
