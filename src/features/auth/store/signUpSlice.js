import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../../api/index.js"

const initialState={
  userName:'',
  email:'',
  password:'',
  confirmPassword:'',
  isUniqueUserName:false,
  isFetchUniqueUserName:false,
  isPasswordMatching:false,
  isSigningUp:false
}

export const signUp=createAsyncThunk('signUp/signUp',async({userName,email,password},signal)=>{
  try{
    const response=await axios.post('/auth/signup',{userName,email,password},{signal})
    return response.data
  }catch(err){
    throw new err
  }
})

export const fetchUniqueUserName=createAsyncThunk('signUp/fetchUniqueUserName',async(userName,signal)=>{
  try{
    const response=await axios(`https://jsonplaceholder.typicode.com/users?username=${userName}`,{signal})
    return response.data
  }catch(err){
    console.log(err)
    throw new err
  }
})

const signUpSlice=createSlice({
  name:'signUp',
  initialState,
  reducers:{
    setUserName(state,action){
      state.userName=action.payload
      if(state.userName===''){
        state.isFetchUniqueUserName=null
        state.isUniqueUserName=null
      }else{
        state.isUniqueUserName=false
        state.isFetchUniqueUserName=true
      }
    },
    resetSignUpData(){
      return initialState
    },
    setPassword(state,action){
      state.password=action.payload
      if(state.confirmPassword===''){
        state.isPasswordMatching=null
        return
      }
      state.isPasswordMatching=(state.password===state.confirmPassword)
    }, 
    setConfirmPassword(state,action){
      state.confirmPassword=action.payload
      if(state.confirmPassword===''){
        state.isPasswordMatching=null
        return
      }
      state.isPasswordMatching=(state.password===state.confirmPassword)
    },
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchUniqueUserName.pending,(state)=>{
        state.isUniqueUserName=null
        state.isFetchUniqueUserName=true
      })
    .addCase(fetchUniqueUserName.fulfilled,(state,action)=>{
        state.isFetchUniqueUserName=false
        if(action.payload.length>0){
          state.isUniqueUserName=false
        }else{
          state.isUniqueUserName=true
        }
    })
    .addCase(fetchUniqueUserName.rejected,(state)=>{
        state.isFetchUniqueUserName=false
        state.isUniqueUserName=null
    })
    .addCase(signUp.pending,(state)=>{
        state.isSigningUp=true
      })
    .addCase(signUp.fulfilled,(state)=>{
        state.isSigningUp=false
      })
    .addCase(signUp.rejected,(state)=>{
        state.isSigningUp=true
      })
  }
})


export const getUserName=(state)=>state.signUp.userName
export const getIsFetchingUniqueUserName=(state)=>state.signUp.isFetchUniqueUserName
export const getIsUniqueUserName=(state)=>state.signUp.isUniqueUserName
export const getIsPasswordMatching=(state)=>state.signUp.isPasswordMatching
export const getPassword=(state)=>state.signUp.password
export const getConfirmPassword=(state)=>state.signUp.confirmPassword
export const getIsSigningUp=(state)=>state.signUp.isSigningUp

export const {setUserName,resetSignUpData,setPassword,setConfirmPassword}=signUpSlice.actions

export default signUpSlice.reducer
