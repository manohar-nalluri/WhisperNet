import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { checkAuthenticated } from "./authSlice"
import axios from "../../../api/index.js"

const initialState={
  userName:'',
  password:'',
  error:'',
  isSigningIn:false
}

export const login=createAsyncThunk('login/login',async({userName,password},{dispatch})=>{
  try{
    const response=await axios.post('/auth/login',{userName,password})
    const token=response.data.data.accessToken
    if(token){
      localStorage.setItem('token',token)
      dispatch(checkAuthenticated())
    }
    console.log('response')
    return response.data
  }catch(err){
    throw new err
  }
})

const loginSlice=createSlice({
  name:"login",
  initialState,
  reducers:{
    setLoginUserName(state,action){
      state.userName=action.payload
    },
    setLoginPassword(state,action){
      state.password=action.payload
    },
    setError(state,action){
      state.error=action.payload
    },
    setButtonLoading(state,action){
      state.buttonLoading=action.payload
    },
    resetLoginData(){
     return initialState 
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(login.pending,(state)=>{
        state.isSigningIn=true
      })
    .addCase(login.fulfilled,(state)=>{
        state.isSigningIn=false
      })
    .addCase(login.rejected,(state,action)=>{
        state.isSigningIn=false
        state.error=action.error
      })
  }
})

export const getLoginUserName=(state)=>state.login.userName
export const getLoginPassword=(state)=>state.login.password
export const getError=(state)=>state.login.error
export const getButtonLoading=(state)=>state.login.buttonLoading
export const getIsSigningIn=(state)=>state.login.isSigningIn

export const {setLoginUserName,setLoginPassword,setError,setButtonLoading,resetLoginData}=loginSlice.actions

export default loginSlice.reducer
