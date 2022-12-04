import React from "react";
import { View } from "@tarojs/components";
import style from "./style.module.scss";
import Card from "../components/Card";
import Icon from "../../../../components/Icon";
import Point from "../../../../components/Point";
import { OrderPropsType } from "../Transaction";
import { getStatusMapInfo } from "../../../../util/orderUtil";

const RemarkRender: React.FC<OrderPropsType> = props => {
  return (
    <>
      <View className={style.main}>
        <View className={style.container}>
          <View className={style.itemWrapper}>
            <View className={style.statusWrapper}>
              <View className={style.status}>
                {getStatusMapInfo(props.order).title}
              </View>
              <View className={style.remark}>
                已为您预留车辆，用车请随身携带必备的证件
              </View>
            </View>
            <Card className={style.card}>
              <View className={style.title}>用车小贴士</View>
              <View className={style.carItemWrapper}>
                <View className={style.leftWrapper}>
                  <View className={style.item}>
                    <Point className={style.point} />
                    <View>取车必备驾驶员本人身份证+中国大陆驾照</View>
                  </View>
                  <View className={style.item}>
                    <Point className={style.point} />
                    <View>了解取还车流程</View>
                  </View>
                  <View className={style.item}>
                    <Point className={style.point} />{" "}
                    <View>关于疫情常态化下出行重要信息提醒</View>
                  </View>
                </View>
                <Icon value="right" className={style.icon} />
              </View>
            </Card>
          </View>
        </View>
      </View>
    </>
  );
};

export default RemarkRender;
