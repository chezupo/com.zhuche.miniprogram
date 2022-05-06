import React from "preact/compat";
import {CoverImage, CoverView, Map, View} from "@tarojs/components";
import {useState} from "preact/hooks";
import {MapProps} from "@tarojs/components/types/Map";
// @ts-ignore
import storeIcon from "../../../asesst/images/storeIcon.svg"
import {primaryThemeColor} from "../../../global";
// @ts-ignore
import style from "./style.module.scss"
import {useAppSelector} from "../../../reduxStore";
import {imageKeyConvertFullURL} from "../../../util/imageUtil";
import Icon from "../../../components/Icon";
import Button from "../../../components/Button";
import taro from "@tarojs/taro";

const iconSize = 35
const NavigationPage: React.FC = () => {
  const configuration = useAppSelector(state => state.configuration)
  const [markers, setMarkers] = useState<MapProps.marker[]>([
    {
      id: 1,
      title: '店名',
      longitude:114.442,
      latitude:22.7679,
      iconPath: storeIcon,
      height: iconSize,
      width: iconSize,
      callout: {
        content: '店名',
        color: primaryThemeColor,
        fontSize: 10,
        display: "ALWAYS",
        textAlign: "center",
        anchorX: 0,
        anchorY: 0,
        borderRadius:0,
        borderWidth: 0,
        borderColor: primaryThemeColor,
        bgColor: 'black',
        padding: 0
      }
    }
  ])
  /**
   * 打开第3方导航
   */
  const handleOpenLocation = async () => {
    await taro.openLocation({
      longitude:114.442,
      latitude: 22.7679,
      name: '目标',
      scale: 15,
      address: '我要去的地铁'
    })
  }
  return (<>
      <Map
        showLocation
        longitude={114.442}
        latitude={22.7679}
        showScale
        scale={12}
        showCompass
        markers={markers}
      />
        <CoverView className={style.containerWrapper}>
          <View className={style.container} >
            <View className={style.name}>市政广场店</View>
            <View className={style.infoWrapper}>
              <View className={style.leftWrapper}>
                  <Icon value='location' />
                  <View className={style.address}>惠州市惠阳区市政广场昊康广场</View>
                  <Icon value='phone' />
                  <View>18026255679</View>
                  <Icon value='time' />
                  <View>08:00-20:00</View>
                  <Icon value='distance' />
                  <View>距离坐标位置0.3KM</View>
              </View>
              <View>
                <CoverImage
                  src={imageKeyConvertFullURL(configuration.config.logo)}
                  className={style.logo}
                />
              </View>
            </View>
            <View className={style.buttonWrapper}>
              <Button type='primary' className={style.goButton} onClick={handleOpenLocation}>打开导航</Button>
            </View>
          </View>
        </CoverView>
  </>)
}

export default NavigationPage
