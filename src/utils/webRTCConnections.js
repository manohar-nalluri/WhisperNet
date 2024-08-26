export const makePeerConnection=(peerId)=>{

  const peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  })
  return peer
}
