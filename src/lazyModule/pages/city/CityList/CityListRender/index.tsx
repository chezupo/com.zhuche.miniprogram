import * as React from "react";
import {useState} from "react";
import {ScrollView} from "@tarojs/components";
import style from '../style.module.scss';
import CityGroup from "../CityGroup";
import {useAppSelector} from "../../../../../reduxStore";

type CityListRenderPropsType = {
 indexKey: string
}
const CityListRender: React.FC<CityListRenderPropsType> = (props) => {
  const city = useAppSelector(state => state.city)
  const ref = React.useRef()

  const [scrollPosition, setScrollPosition] = useState<number>(2000)
  const [id, setId] = useState<string>('5')

  return (
    <ScrollView
      className={style.leftBarWrapper}
      scrollTop={scrollPosition}
      scrollY
      scrollWithAnimation
      ref={ref}
      {...(id ? {scrollIntoView: id} : {})}
    >
      {
        city.list.map((v, k) =>
          <CityGroup
            title={v.key}
            items={v.list}
            id={k}
            key={k}
            keyIndex={props.indexKey}
          />
        )
      }
    </ScrollView>
    )
}

export default CityListRender
