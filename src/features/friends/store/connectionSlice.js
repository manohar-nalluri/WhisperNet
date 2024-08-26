import { createSlice } from "@reduxjs/toolkit"

initialState={
  connections:{
    luffy:{
      pc:null,
      dc:null,
      vc:null,
      fc:null
    }
  }
}

const connectionSlice=createSlice({
  name:"connections",
  initialState,
  reducers:{},
})

export const {}=connectionSlice.actions
export default connectionSlice.reducer
