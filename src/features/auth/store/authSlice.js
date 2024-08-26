import { createSlice } from "@reduxjs/toolkit";

const initialState={
  selectedForm:'sign up',
  loggedIn:false
}

const authSlice=createSlice({
  name:"auth",
  initialState:initialState,
  reducers:{
    checkAuthenticated(state){
      const auth=localStorage.getItem('token')
      if(auth){
        state.loggedIn=true
      }
    },
    toggleRegisterForm(state,action){
      if(!action.payload){
        state.selectedForm==='sign in'?(state.selectedForm='sign up'):(state.selectedForm='sign in')
        return
      }
      action.payload!==state.selectedForm&&(state.selectedForm=action.payload)
    },
  }
})


export const getSelectedForm=(state)=>state.auth.selectedForm
export const isAuthenticated=(state)=>state.auth.loggedIn

export const {checkAuthenticated,toggleRegisterForm}=authSlice.actions

export default authSlice.reducer
