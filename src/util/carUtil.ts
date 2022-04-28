import {useAppDispatch} from "../reduxStore";
import {CarItemType} from "../typings";
import {setCar} from "../reduxStore/module/order";
import {navigateToCheckoutOrder} from "../store/module/router";

/**
 * 选中汽车
 */
const useCheckedCar = (): (car: CarItemType) => void => {
  const dispatch = useAppDispatch()
  const handleSelectCar = (car: CarItemType) => {
    dispatch(setCar(car))
    navigateToCheckoutOrder()
  }

  return handleSelectCar;
}

export {useCheckedCar}

