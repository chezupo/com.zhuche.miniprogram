import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import BusIcon from "../../../../../components/icon/BusIcon";
import {noticeColor} from "../../../../../config/globalConfig";
import MenuIcon from "../../../../../components/icon/MenuIcon";
import GuidIcon from "../../../../../components/icon/GuidIcon";

const Attraction = () => {
  return (
    <>
      <View className={style.main}>
        <View className={style.titleWrapper} >
          <View className={style.title}>
            <View> 长沙南站便捷点(站内取还) </View>
            <BusIcon className={style.icon} color={noticeColor} />
          </View>
          <MenuIcon className={style.menuIcon} />
        </View>
        <View className={style.tagWrapper}>
          <View className={style.tag}>24h</View>
          <View className={style.tag}>含自助车型</View>
        </View>
        <View className={style.addressWrapper}>
          <View className={style.address}>地址: 长沙市长沙县黄花机场T2航站楼P2南停车场</View>
          <GuidIcon className={style.guidIcon} color={noticeColor} />
        </View>

        <View className={style.businessHours}>
          营业时间: 00:00 - 23:59
        </View>

      </View>
    </>
  )
}

export default Attraction;
