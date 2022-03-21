import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ConfigurationType} from "../../store/module/configuration";
import {AppDispatch, RootState} from "../index";
import {getConfiguration} from "../../api/configuration";
import store from '../index'
import {debounce} from "../../util/helper";

type InitialStateType = {
  config: ConfigurationType
  isShowNotice: boolean
}
const initialState: InitialStateType = {
  config: {
    imgPrefix: '',
    amapKey: '',
    amapSearchKey: '',
    appName: '',
    notice: '',
    logo: ''
  },
  isShowNotice: true
}


const handleInit = debounce(
  () => store.dispatch(initThunk()).then(() => console.log('Init configurations.')), 1000
)

const configurationSlice = createSlice({
  name: 'configuration',
  initialState: (): InitialStateType => {
    handleInit()

    return initialState
  },
  reducers: {
    init: (state, action: PayloadAction<ConfigurationType>): InitialStateType =>  ({...state, config:  action.payload}),
    setNoticeVisitable: (state, action: PayloadAction<boolean>): InitialStateType => {
      return {...state, isShowNotice: action.payload}
    }
  }
})

const configurationReducer = configurationSlice.reducer

const initThunk = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const configuration = await getConfiguration()
    dispatch(init(configuration))
  }
}

export const {init, setNoticeVisitable} = configurationSlice.actions
export default configurationReducer

