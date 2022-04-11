import {View} from "@tarojs/components";
import * as React from "react";
// @ts-ignore
import style from './style.module.scss'
import Car from "./Car";
import Notice from "../Notice";
import {navigateToCarDetailPage, switchTab, TabBarType} from "../../../../../store/module/router";
import {CarItemType} from "../../../../../typings";
import { useAppDispatch } from "../../../../../reduxStore";
import {setCarDetail} from "../../../../../reduxStore/module/cars";
import EmptyRender from "../../../stories/SearchResultRender/EmptyRender";

type RightBarPropsType = {
  cars: CarItemType[]

}
const RightBar: React.FC<RightBarPropsType> = ({cars}) => {
  const handleSelectCar = (car: CarItemType) => switchTab(TabBarType.ORDER)
  const dispatch = useAppDispatch()
  const handleShowDetail = (car: CarItemType) => {
    dispatch(setCarDetail(car))
    navigateToCarDetailPage()
  }

  return (<View className={style.main}>
    {
      cars.length === 0 && (
        <EmptyRender />
      )
    }
    {
      cars.length > 0 && (<>
        <Notice />
        {
          cars.map(car => (
            <Car key={car.id}
              data={car}
              onClick={handleSelectCar}
              onShowDetail={() => handleShowDetail(car)}
            />
          ))
        }
      </>)

    }
  </View>)
}

export default RightBar
