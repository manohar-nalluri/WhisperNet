import {configureStore} from "@reduxjs/toolkit"
import friendsReducer from '../features/friends/store/friendsSlice.js'
import chatReducer from '../features/chatting/store/chatSlice.js'
import authReducer from '../features/auth/store/authSlice.js'
import signUpReducer from '../features/auth/store/signUpSlice.js'
import loginReducer from '../features/auth/store/loginSlice.js'
import connectionReducer from '../features/chatting/store/connectionStateSlice.js'
const store=configureStore({
  reducer:{
    friends:friendsReducer,
    chat:chatReducer,
    auth:authReducer,
    signUp:signUpReducer,
    login:loginReducer,
    connection:connectionReducer
  }
})

export default store
