import { onNewMessageArraival } from "../features/chatting/store/chatSlice";
import { changeConnectionState, setDataChannel } from "../features/chatting/store/connectionStateSlice";

export const createOffer=async({peer,socket,peerConnections,dispatch})=>{
  if(!peerConnections.current[peer]){
    peerConnections.current[peer]={
      pc:null,
      dc:null,
      fc:null
    };}
  peerConnections.current[peer].pc=new RTCPeerConnection();
  peerConnections.current[peer].dc=peerConnections.current[peer].pc.createDataChannel('message');
  dataChannelSetUp({peerConnections,peer,dispatch})
  peerConnections.current[peer].pc.onicecandidate=(event)=>{
    if(event.candidate==null){
      socket.current.emit('offer',{peer,offer:peerConnections.current[peer].pc.localDescription})
    }
  }
  handleConnectionState({peerConnections,peer,dispatch})
  peerConnections.current[peer].pc.createOffer().then(offer=>peerConnections.current[peer].pc.setLocalDescription(offer).then(()=>{
  }))
}

export const createAnswer=async({peer,socket,offer,peerConnections,dispatch})=>{
  if(!peerConnections.current[peer]){
    peerConnections.current[peer]={
    pc:null,
    dc:null,
    fc:null
  }}
    peerConnections.current[peer].pc=new RTCPeerConnection();
    peerConnections.current[peer].pc.ondatachannel=(event)=>{
      if(event.channel.label==='message'){
        peerConnections.current[peer].dc=event.channel
        dataChannelSetUp({peerConnections,peer,dispatch})
      }else if(event.channel.label==='file-transfer'){
      peerConnections.current[peer].fc=event.channel
      }
    }
  handleConnectionState({peerConnections,peer,dispatch})
   
  peerConnections.current[peer].pc.onicecandidate=(event)=>{
    if(event.candidate==null){
      socket.current.emit('answer',{peer,answer:peerConnections.current[peer].pc.localDescription})
    }
  }

  peerConnections.current[peer].pc.setRemoteDescription(new RTCSessionDescription(offer)).then(()=>{
    peerConnections.current[peer].pc.createAnswer().then(answer=>peerConnections.current[peer].pc.setLocalDescription(answer).then(()=>{
    }))
  })
}

export const acceptAnswer=async({peer,answer,peerConnections})=>{
  if(peerConnections.current[peer]){
    peerConnections.current[peer].pc.setRemoteDescription(new RTCSessionDescription(answer))
  }else{
  }
}


const dataChannelSetUp=({peerConnections,peer,dispatch})=>{
  peerConnections.current[peer].dc.onopen=()=>{
    dispatch(setDataChannel({peer,status:true}))
  }
  peerConnections.current[peer].dc.onclose=()=>{
    dispatch(setDataChannel({peer,status:false}))
  }
  peerConnections.current[peer].dc.onmessage=(event)=>{
    dispatch(onNewMessageArraival({peer,message:event.data}))
  }
}
const handleConnectionState=({peerConnections,peer,dispatch})=>{
  peerConnections.current[peer].pc.onconnectionstatechange=(_)=>{
  dispatch(changeConnectionState( {peer,status:peerConnections.current[peer].pc.connectionState} ))
  }

}
