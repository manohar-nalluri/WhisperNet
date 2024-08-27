import { io } from 'socket.io-client';
import { fetchFriends } from '../features/friends/store/friendsSlice';
// import {  createPeerConnection } from '../store/webRTCSlice';
import { createOffer } from './webRTC';
import { createConnection } from '../features/chatting/store/connectionStateSlice';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL 


export const getSocket = () => {
  const socket = io(SOCKET_SERVER_URL, {
    auth: { token: "bearer "+(localStorage.getItem('token') || ' ') },  
    reconnection: true,  
    reconnectionAttempts: Infinity, 
    reconnectionDelay: 1000, 
    reconnectionDelayMax: 5000, 
    timeout: 20000, 
  });

  socket.on('connect', () => {
    console.log('Connected to server');
  });
  socket.on("connect_error", (err) => {
    console.log(err.message); 
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  return socket;
};


export const handleFriendsList=({data,socket,dispatch,peerConnections})=>{
  console.log('handling friends list',data)
  sessionStorage.setItem('friends',JSON.stringify(data))
  dispatch(fetchFriends())
  data.map((friend)=>{
    dispatch(createConnection({peer:friend.userName}))
    if(friend.online){
      createOffer({peer:friend.userName,socket,peerConnections,dispatch})
    }
  })
}

export const handleConnectionChange=(userName,status,dispatch)=>{
  const friends=JSON.parse(sessionStorage.getItem('friends'))
  const updatedFriends=friends.map((friend)=>{
    if(friend.userName==userName){
      friend.online=status
    }
    return friend
  })
  sessionStorage.setItem('friends',JSON.stringify(updatedFriends))
  dispatch(fetchFriends())
}
