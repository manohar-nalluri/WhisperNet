import { createSlice } from "@reduxjs/toolkit";

const initialState={
  
}

const connectionStateSlice=createSlice({
  name:"connectionState",
  initialState,
  reducers:{
    createConnection(state,action){
      state[action.payload.peer]={
        connected:false,
        dataChannelOpen:false,
        fileChannelOpen:false,
      }
    },
    setDataChannel(state,action){
      state[action.payload.peer].dataChannelOpen=action.payload.status
    },
    changeConnectionState(state,action){
      state[action.payload.peer].connected=action.payload.status
    }

  }
})

export const getConnectionStateOfSelectedUser=(state)=>{
  if(!state.chat.selectedUser) return false
  const selectedUser=state.chat.selectedUser.userName
  if(!state.connection[selectedUser.userName]) return false
  return state.connection[selectedUser.userName].connected
  }

export const {createConnection,setDataChannel,changeConnectionState}=connectionStateSlice.actions


export default connectionStateSlice.reducer
