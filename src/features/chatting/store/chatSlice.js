import { createSlice } from "@reduxjs/toolkit";

const initialState={
  fetching:false,
  messages:{},
  unReadMessages:{},
  selectedUser:null,
  }



const chatSlice=createSlice({
  name:"chat",
  initialState,
  reducers:{
    clearSelectedUser(state){
      state.selectedUser=null
    },
    setSelectedUser(state,action){
      state.selectedUser=action.payload
    },
    onNewMessageArraival(state,action){
      if(!state.messages[action.payload.peer]){
        state.messages[action.payload.peer]=[]
      }
      state.messages[action.payload.peer].push({received:true,data:action.payload.message})
      if(!state.unReadMessages[action.payload.peer]){
        state.unReadMessages[action.payload.peer]=0
      }
      state.unReadMessages[action.payload.peer]++
    },
    handleSent(state,action){
      if(!state.messages[action.payload.peer]){
        state.messages[action.payload.peer]=[]
      }
      state.messages[action.payload.peer].push({received:false,data:action.payload.message})

    },
    clearUnReadMessages(state,action){
      state.unReadMessages[action.payload.peer]=0
    }
  },

  extraReducers:(builder)=>{

  },
})

export const getSelectedUser=(state)=>state.chat.selectedUser

export const {clearSelectedUser,setSelectedUser,onNewMessageArraival,handleSent}=chatSlice.actions

export default chatSlice.reducer
