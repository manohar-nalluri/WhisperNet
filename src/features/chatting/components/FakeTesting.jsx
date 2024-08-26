import  { useEffect, useRef, useState } from 'react'
const FakeTesting = () => {
  const videoRef=useRef()
  const messageRef=useRef()
  const phoneCall=useRef()
  const [message,setMessage]=useState('')
  const [offer,setOffer]=useState('')
  const [channelOpend,setChannelOpend]=useState(false)
  const peerConnection=useRef()
  const dataChannel=useRef()
  const [answer,setAnswer]=useState('')
  const [iceCandidates,setIceCandidates]=useState('')
  const inputRef=useRef()
  const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
  useEffect(()=>{
  peerConnection.current = new RTCPeerConnection(configuration);
    peerConnection.current.ondatachannel=(event)=>{
      if(event.channel.label==='phone'){
        phoneCall.current=event.channel
        
        return
      }
      console.log(event.channel.label)
      dataChannel.current=event.channel
      dataChannel.current.onmessage=(event)=>{
        console.log('message',event)
        setMessage(event.data)
      }
      dataChannel.current.onopen=()=>{
        setChannelOpend(true)
        setOffer('')
        setAnswer('')
      }
    }
       peerConnection.current.onicecandidate=(e)=>{
    setOffer(peerConnection.current.localDescription)
    }
    peerConnection.current.ontrack=(v)=>{
      console.log('track added',v)
    }
  },[])

  useEffect(()=>{
    peerConnection.current.onnegotiationneeded=()=>{
      if (peerConnection.current.connectionState!=='connected'){
      return}
      peerConnection.current.createOffer().then(offer=>peerConnection.current.setLocalDescription(offer)).then(()=>setOffer(offer))
  }},[])


  const handleCall=async()=>{
    const constraints = {'video': true, 'audio': true};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject=stream
      stream.getTracks().forEach(track => peerConnection.current.addTrack(track,stream));

  }

  const handleMessageSend=()=>{
    console.log(dataChannel.current)
    dataChannel.current.send(messageRef.current.value)

  }

  const generateOffer=()=>{
       dataChannel.current=peerConnection.current.createDataChannel('test')
    peerConnection.current.ondatachannel=(event)=>{
      console.log(event.channel.label)
    }
        dataChannel.current.onopen=()=>{
      console.log('worked due to this')
      setChannelOpend(true)
      setOffer('')
      setAnswer('')
    }
    dataChannel.current.onmessage=(event)=>{
        console.log('message',event)
        setMessage(event.data)
      }
      peerConnection.current.createOffer()
      .then(offer=>peerConnection.current.setLocalDescription(new RTCSessionDescription(offer))
    );
  }
  const connect=()=>{
    peerConnection.current.setRemoteDescription(new RTCSessionDescription(JSON.parse(inputRef.current.value)))
  }
  
  const acceptOffer=()=>{
    peerConnection.current.setRemoteDescription(new RTCSessionDescription(JSON.parse(inputRef.current.value))).then(()=>console.log('setRemoteOffer'));
    peerConnection.current.createAnswer().then(answer=>peerConnection.current.setLocalDescription(new RTCSessionDescription(answer)).then(()=>setAnswer(answer)));
  }

  // await peerConnection.setLocalDescription(offer);

  return (
    !channelOpend?
    <>
      <p>offer:{JSON.stringify(offer)}</p>
      <p>answer:{JSON.stringify(answer)}</p>
      <p>iceCandidates:{JSON.stringify(iceCandidates)}</p>
      <input ref={inputRef} type='text'/>
      <button onClick={()=>console.log(dataChannel.current)}>Check</button>
      <button onClick={()=>inputRef.current.value=''}>clear</button>
      <button onClick={generateOffer}>offer</button>
      <button onClick={acceptOffer}>ans</button>
      <button onClick={connect}>connect</button>
    </>:
    <>
        <h1>offer:{offer}</h1>
        <p>{message}</p>
        <input ref={messageRef} />
        <button onClick={handleMessageSend}>Send</button>
        {/* <PhoneCallTesting connection={peerConnection}/> */}
        <button onClick={handleCall}>call</button>
        <button onClick={()=>console.log(peerConnection.current)}>check</button>
        <video ref={videoRef} autoPlay playsInline></video>
      </>
  )
}

export default FakeTesting
