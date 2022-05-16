import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import getPlatformType, {AllPlatformType} from "../../util/platformType";
import authCode from "../../nativeInterface/authCode";
import {authorize} from "../../api/authoriztion";
import {getMeInfo, updateMeInfo, updateMyPhoneNumber, UpdateMyPhoneNumberQueryType} from "../../api/me";
import {AppDispatch, RootState} from "../index";
import {getUserProfile} from "../../nativeInterface/getUserProfile";
import {setToken} from "../../util/authUtil";
import {getTransaction} from "../../api/transaction";

type InitialStateType = {
  data?: MeItemType
  loading: boolean
  pid?: number
}

const initialState:InitialStateType = {
  data: undefined,
  loading: false,
}

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Pick<MeItemType,
      'isNewUser' |
      'balance' |
      'accessToken'
    > >) => {
      return {...state, data: {...state.data, ...action.payload}}
    },
    uploadUserInfo: (state, action: PayloadAction<MeItemType>) => {
      return {...state, data: action.payload, isLogin: true}
    },
    setTransaction:(state, action: PayloadAction<TransactionItemType[]>) => {
      return {...state, data: {
          ...state.data,
          transactions: action.payload
        } }
    },
    logout: (state) => {
      const {data, ...other} = state
      return {...other, isLogin: false}
    },
    save: (state, action: PayloadAction<MeItemType>): InitialStateType => {
      return {...state, data: action.payload}
    },
    setPid: (state, action: PayloadAction<number>): InitialStateType => {
      return ({...state, pid: action.payload})
    }
  }
})

// 静默登录
const loginThunk =  (pid?: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const platformType = getPlatformType()
    if (AllPlatformType.ALIPAY === platformType) {
      const code = await authCode()
      const {isNewUser, accessToken} = await authorize(code, pid)
      setToken(accessToken)
      dispatch(login({
        isNewUser,
        balance: 0,
        accessToken,
      }))
      const newUserInfo = await getMeInfo()
      const meData = getState().me.data
      console.log(meData)
      dispatch(login({
        ...meData,
        ...newUserInfo
      }))
    } else if (AllPlatformType.TT === platformType) {
      const code = await authCode()
      const {isNewUser, accessToken} = await authorize(code, pid)
      debugger

    }
  }
}

const refreshThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const newUserInfo = await getMeInfo()
    const meData = getState().me.data
    dispatch(login({
      ...meData,
      ...newUserInfo
    }))
  }
}

// 手动触发登录并收集提交用户信息
const uploadUserInfoThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    let me: MeItemType = getState().me.data
    if (!me || !me.accessToken) {
      await dispatch(loginThunk(getState().me.pid))
      me = getState().me.data
    }
    const {avatar, nickName, city, code, countryCode, gender, province, } = await getUserProfile()
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

/**
 * 获取账单
 */
const getTransactionThunk = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    const transactionItems = await getTransaction()
    dispatch(setTransaction(transactionItems))
  }
}

const meReducer = meSlice.reducer

export {loginThunk, uploadUserInfoThunk, updateMyPhoneNumberThunk, refreshThunk, getTransactionThunk}
export const {login, uploadUserInfo, logout, save, setTransaction, setPid} = meSlice.actions
export default meReducer
