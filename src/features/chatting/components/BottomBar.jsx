import { MdOutlineEmojiEmotions,MdLocalPhone } from "react-icons/md";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import { useContext,  useRef } from "react";
import { peerContext } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedUser, handleSent } from "../store/chatSlice";
const BottomBar = () => {
  const inputRef=useRef()
  const selectedUser=useSelector(getSelectedUser)
  const dispatch=useDispatch()
  const peerConnections=useContext(peerContext)
  const handleSendMessage=()=>{
    if(selectedUser){
      console.log(peerConnections)
      peerConnections.current[selectedUser.userName].dc.send(inputRef.current.value)
      dispatch(handleSent({peer:selectedUser.userName,message:inputRef.current.value}))
      inputRef.current.value=''
    }
  }
  return (
    <div className='flex items-center text-lg mb-2 sticky bottom-0'>
      <MdOutlineEmojiEmotions className=" text-lg"/>
      <p className="mx-2">M</p>
      <IoDocumentAttachOutline className="mx-2"/>
      <MdLocalPhone className="mx-2"/>
      <input ref={inputRef} type='text' className="w-full px-2 rounded-lg"/>
      <IoMdSend className="mx-2" onClick={handleSendMessage}/>
    </div>
  )
}

export default BottomBar
