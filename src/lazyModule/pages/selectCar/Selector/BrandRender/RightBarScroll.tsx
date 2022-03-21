import * as React from "react";
import {View} from "@tarojs/components";
// @ts-ignore
import style from "./style.module.scss"
import {BrandType, SeriesType} from "./index";

type RightBarScrollPropsType = {
  activeBrand: BrandType
  onCheckAllSeries: () => void
  onActiveSeries: (series: SeriesType) => void
}
const RightBarScroll = ({activeBrand, onCheckAllSeries, onActiveSeries}: RightBarScrollPropsType): React.ReactElement => {
  return (

    <View className={style.rightWrapper}>
      <View
        className={[style.seriesWrapper, activeBrand.isCheckAll ? style.activeBrand : ''].join(' ')}
        onClick={onCheckAllSeries}
      >
        <View> 不限车系 </View>
        { activeBrand.isCheckAll && <View className='at-icon at-icon-check' /> }
      </View>

      {activeBrand.series.map(i => (
        <View
          className={[style.seriesWrapper, i.isCheck ? style.activeBrand : ''].join(' ')}
          key={i.id}
          onClick={() => onActiveSeries(i)}
        >
          <View> {i.name}</View>
          { i.isCheck && <View className='at-icon at-icon-check' /> }
        </View>
      ))}

    </View>

  )

}


export default RightBarScroll
