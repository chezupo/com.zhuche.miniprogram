import {StoreItemType} from "../typings";
import {setEndStore, setStarStore, StartStoreOrEndStoreType} from "../reduxStore/module/order";
import {navigateToHome} from "../store/module/router";
import {useAppDispatch, useAppSelector} from "../reduxStore";

/**
 * 选择门店
 * @param value
 */
const useCheckedStore = (value: StoreItemType): () => void => {
  const dispatch = useAppDispatch()
  const {createOrder} = useAppSelector(state => state.order)
  const handleClick = () => {
    switch (createOrder.startStoreOrEndStore) {
      case StartStoreOrEndStoreType.END:
        dispatch(setEndStore(value))
        navigateToHome()
        break;
      case StartStoreOrEndStoreType.START:
        dispatch(setStarStore(value))
        navigateToHome()
        break
    }
  }

  return handleClick;

}

export {useCheckedStore}
