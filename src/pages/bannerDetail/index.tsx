import * as React from "react";
import * as Taro from "@tarojs/taro"
import useObserve from "../../util/useObserve";
import Getters from "../../store/getters";
import {View} from "@tarojs/components";

const BannerDetail: React.FC = ()  => {
  const [banners] = useObserve(Getters.bannerObserve)
  const {id} = Taro.getCurrentInstance().router.params
  const banner = banners.find(i => i.id == parseInt(id) )
  Taro.setNavigationBarTitle({title: banner.title})

  return (
    <View dangerouslySetInnerHTML={{ __html: banner.content}}></View>
  )
}

export default BannerDetail
