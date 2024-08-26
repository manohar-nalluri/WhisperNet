import { useSelector } from "react-redux"
import { getSelectedUser } from "../store/chatSlice"
import ChattingCard from "./ChattingCard"

const ChattingDisplay = () => {
  const selectedUser =useSelector(getSelectedUser)
  const messages=selectedUser?useSelector((state)=>state.chat.messages[selectedUser.userName]):[]
  return (
    <div className="overflow-y-auto no-scrollbar justify-start">
      {messages&&messages.map((message,index)=>{
        return <ChattingCard key={index} message={message}/>
      })}
    </div>
  )
}

export default ChattingDisplay
