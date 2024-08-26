import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/index.js"

const initialState={
  fetching:false,
  friends:[],
  error:'',
  pendingFriendRequestPage:false,
  pendingFriendRequests:[],
  displayFriends:[],
}

export const fetchPendingFriendRequests=createAsyncThunk('friends/fetchPendingFriendRequests',async()=>{
    try{
      const response=await axios.get('/friends/requests',{headers:{'authorization':'bearer '+(localStorage.getItem('token')||'')}})
      return response.data.data
    }
    catch(err){
      throw new err
    }
  }
)

export const sendFriendRequest=createAsyncThunk('friends/sendFriendRequest',async({userName})=>{
  try{
    const response=await axios.post('/friends/sendRequest',{userName},{headers:{'authorization':'bearer '+(localStorage.getItem('token')||'')}})
    return response.data
  }catch(err){
    throw new err
  }
})

export const acceptFriendRequest=createAsyncThunk('friends/acceptFriendRequest',async()=>{
  
})

export const rejectFriendRequest=createAsyncThunk('friends/rejectFriendRequest',async()=>{
  
})

const friendsSlice=createSlice({
  name:"friends",
  initialState,
  reducers:{
    filterFriends(state,action){
      state.displayFriends=state.friends.filter((friend)=>{
        return friend.userName.toLowerCase().includes(action.payload.toLowerCase())
      })
    },
    togglePendingFriendRequestPage(state){
      state.pendingFriendRequestPage=!state.pendingFriendRequestPage
    },
    setFriends(state){
      state.displayFriends=state.friends
    },
    fetchFriends(state){
      state.friends=JSON.parse(sessionStorage.getItem('friends'))
      state.displayFriends=state.friends
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchPendingFriendRequests.pending,(state)=>{
        state.fetching=true
      })
    .addCase(fetchPendingFriendRequests.fulfilled,(state,action)=>{
        state.fetching=false
        state.displayFriends=action.payload.friends
      })
    .addCase(fetchPendingFriendRequests.rejected,(state,action)=>{
        state.fetching=false
        state.error=action.err||"something went wrong!"
      })
  }
})

export const getPendingFriendRequestPage=(state)=>state.friends.pendingFriendRequestPage
export const getPendingFriendRequests=(state)=>state.friends.displayFriends
export const getFetching=(state)=>state.friends.fetching
export const getDisplayFriends=(state)=>state.friends.displayFriends

export const {filterFriends,togglePendingFriendRequestPage,setFriends,fetchFriends}=friendsSlice.actions
export default friendsSlice.reducer
