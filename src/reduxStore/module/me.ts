import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MeItemType} from "../../typings";
import getPlatformType, {AllPlatformType} from "../../util/platformType";
import authCode from "../../nativeInterface/authCode";
import {authorize} from "../../api/authoriztion";
import {getMeInfo, updateMeInfo, updateMyPhoneNumber, UpdateMyPhoneNumberQueryType} from "../../api/me";
import {AppDispatch, RootState} from "../index";
import {getUserProfile} from "../../nativeInterface/getUserProfile";
import {setToken} from "../../util/authUtil";

type InitialStateType = {
  data?: MeItemType
  loading: boolean
}

const initialState:InitialStateType = {
  data: undefined,
  loading: false,
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
      return {...state, data: action.payload, isLogin: true}
    },
    logout: (state) => {
      const {data, ...other} = state
      return {...other, isLogin: false}
    },
    save: (state, action: PayloadAction<MeItemType>): InitialStateType => {
      return {...state, data: action.payload}
    }
  }
})

// 静默登录
const loginThunk =  () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    if (AllPlatformType.ALIPAY === getPlatformType()) {
      const code = await authCode()
      const {isNewUser, accessToken} = await authorize(code)
      setToken(accessToken)
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

// 手动触发登录并收集提交用户信息
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

/**
 * 更新用户手机号
 */
const updateMyPhoneNumberThunk = (queryData: UpdateMyPhoneNumberQueryType) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const newUserInfo = await updateMyPhoneNumber(queryData)
    dispatch(save(newUserInfo))
  }
}

const meReducer = meSlice.reducer

export {loginThunk, uploadUserInfoThunk, updateMyPhoneNumberThunk}
export const {login, uploadUserInfo, logout, save} = meSlice.actions
export default meReducer
