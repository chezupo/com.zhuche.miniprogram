import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MeItemType} from "../../typings";
import getPlatformType, {AllPlatformType} from "../../util/platformType";
import authCode from "../../nativeInterface/authCode";
import {authorize} from "../../api/authoriztion";
import {getMeInfo, updateMeInfo} from "../../api/me";
import {AppDispatch, RootState} from "../index";
import {getUserProfile} from "../../nativeInterface/getUserProfile";

type InitialStateType = {
  data?: MeItemType
  loading: boolean
}

const initialState:InitialStateType = {
  data: undefined,
  loading: false
}

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<MeItemType>) => {
      const {payload} = action
      return {...state, data: payload}
    },
    uploadUserInfo: (state, action: PayloadAction<MeItemType>) => {
      return {...state, data: action.payload}
    },
    logout: (state) => {
      const {data, ...other} = state
      return {...other}
    }
  }
})

const loginThunk =  () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    if (AllPlatformType.ALIPAY === getPlatformType()) {
      const code = await authCode()
      const {isNewUser, accessToken} = await authorize(code)
      dispatch(login({
        isNewUser,
        accessToken,
      }))
      const newUserInfo = await getMeInfo()
      const meData = getState().me.data
      dispatch(login({
        ...meData,
        ...newUserInfo
      }))
    }
  }
}

const uploadUserInfoThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    let me: MeItemType = getState().me.data
    if (!me || !me.accessToken) {
      await dispatch(loginThunk())
      me = getState().me.data
    }
    const {avatar, nickName, city, code, countryCode, gender, province} = await getUserProfile()
    const res = await updateMeInfo({avatar, province, nickName, countryCode, code, gender, city})
    dispatch(uploadUserInfo({...me, ...res}))
  }
}

const meReducer = meSlice.reducer

export {loginThunk, uploadUserInfoThunk}
export const {login, uploadUserInfo, logout} = meSlice.actions
export default meReducer
