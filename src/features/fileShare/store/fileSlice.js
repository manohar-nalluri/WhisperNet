import { createSlice } from "@reduxjs/toolkit"

initialState={
  file:null,
}


const fileSlice=createSlice({
  name:'file',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{},
})

export const {}=fileSlice.actions
export default fileSlice.reducer
