import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialStateType = {
  detail: string
}
const initialState: InitialStateType = {
  detail: ''
}
const agreementSlice = createSlice({
  name: 'agreement',
  initialState,
  reducers: {
    setDetail: (state,action: PayloadAction<string> ): InitialStateType => {
      return {...state, detail: action.payload}
    }
  }
})

const agreementReducer = agreementSlice.reducer

export const {setDetail} = agreementSlice.actions
export default agreementReducer
