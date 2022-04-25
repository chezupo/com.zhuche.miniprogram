import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum TabBarType {
  HOME='HOME',
  ORDER = 'ORDER',
  ME = 'ME'
}

type InitialStateType = {
  activeTab: TabBarType
}
const initialState: InitialStateType = {
  activeTab: TabBarType.HOME
}


const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TabBarType>) => {
      return {...state, activeTab: action.payload}
    }
  }
})

const layoutReducer = layoutSlice.reducer

export const {setActiveTab} = layoutSlice.actions
export default layoutReducer
