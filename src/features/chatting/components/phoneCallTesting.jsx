import React,{useRef,useEffect} from 'react'

const PhoneCallTesting = ({connection}) => {
  const videoRef=useRef()
async function playVideoFromCamera() {
    try {
        const constraints = {'video': true, 'audio': true};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject=stream
      stream.getTracks().forEach(track => connection.current);
    } catch(error) {
        console.error('Error opening video camera.', error);
    }
}
  const createPhoneCall=(type,callback)=>{
   navigator.mediaDevices.enumerateDevices()
        .then(devices => {
            const filtered = devices.filter(device => device.kind === type);
            callback(filtered);
        });  }

  useEffect(()=>{
    console.log('added event listener')
    connection.current.ontrack=(v)=>{
      console.log('incomming track',v)
    }
},[]);
  
  return (
    <>
      <button onClick={()=>console.log(connection.current)}>check</button>
      <button onClick={playVideoFromCamera}>Start</button>
    <div onClick={()=>createPhoneCall('videoinput', cameras => console.log('Cameras found', cameras))}>PhoneCallTesting</div>
    <video ref={videoRef} id="localVideo" autoPlay playsInline controls="false"/>
    </>
  )
}

export default PhoneCallTesting
