import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "../index";
import {getUserCoupons} from "../../api/userCoupons";

type InitialStateType = {
  list: UserCouponItemType[]
  loading: boolean
}
const initialState: InitialStateType = {
  list: [],
  loading: false
}
const userCouponSlice = createSlice({
  name: 'userCoupon',
  initialState,
  reducers: {
    init: (state, action: PayloadAction<UserCouponItemType[]>): InitialStateType => {
      return {...state, list: action.payload }
    },
   setLoading: (state, action: PayloadAction<boolean>): InitialStateType => {
      return {...state, loading: action.payload}
    }
  }
})

const userCouponReducer = userCouponSlice.reducer

const iniUserCouponThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoading(true))
    try {
      dispatch(init( await getUserCoupons() ))
    }finally {
      dispatch(setLoading(false))
    }
  }
}


export const {init, setLoading} = userCouponSlice.actions
export {iniUserCouponThunk}
export default userCouponReducer
