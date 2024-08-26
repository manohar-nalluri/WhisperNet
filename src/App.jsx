import './App.css'
import AuthComponent from './features/auth/AuthComponent'
import FriendsComponent from './features/friends/FriendsComponent'
import ChattingComponent from './features/chatting/ChattingComponent'
import { createContext, useEffect, useRef } from 'react'
import { getSocket, handleConnectionChange, handleFriendsList } from './utils/socket'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthenticated, isAuthenticated } from './features/auth/store/authSlice'
import { acceptAnswer, createAnswer } from './utils/webRTC'
import { getSelectedUser } from './features/chatting/store/chatSlice'

export const peerContext=createContext()

function App() {
  const isLoggedIn=useSelector(isAuthenticated)
  const peerConnections=useRef({})
  const activeComponent=useSelector(getSelectedUser)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(checkAuthenticated())
  },[])
  const socket=useRef()
  const firstTime=sessionStorage.getItem('firstTime')
  useEffect(()=>{
    if(isLoggedIn){
    console.log('running socket')
    socket.current=getSocket()
    if(firstTime==null){
      socket.current.emit('firstTimeConnected')
      socket.current.on('friends',(data)=>handleFriendsList({data,socket,dispatch,peerConnections}))
      socket.current.on('connectionChange',(userName,status)=>{handleConnectionChange(userName,status,dispatch)})
      socket.current.on('offer',({peer,offer})=>createAnswer({peer,offer,socket,peerConnections,dispatch}))
      socket.current.on('answer',({peer,answer})=>acceptAnswer({peer,answer,peerConnections}))
      sessionStorage.setItem('firstTime',true)
      return
    }}
  },[isLoggedIn])


  return (
    isLoggedIn?
    <div className="flex h-full w-full">
      {activeComponent === null && (
        <div className="w-full md:hidden h-full">
            <button>small screen</button>
          <FriendsComponent  />
        </div>
      )}
      {activeComponent !== null && (
        <div className="w-full md:hidden h-full">
          <peerContext.Provider value={peerConnections}>
              <button>small screen</button>
            <ChattingComponent />
          </peerContext.Provider>
        </div>
      )}
      {/* On larger screens, show both components side by side */}
      <FriendsComponent />
      <peerContext.Provider value={peerConnections}>
      <ChattingComponent />
      </peerContext.Provider>
    </div>:
    <AuthComponent/>
  )
}

export default App
