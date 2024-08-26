import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedUser, getSelectedUser } from '../store/chatSlice';
const ChattingHeader = () => {
  const selectedUser=useSelector(getSelectedUser)
  const dispatch=useDispatch()
  return (
    <div className='flex items-center mt-2'>
      <IoIosArrowBack className="hover:cursor-pointer ml-2" onClick={()=>dispatch(clearSelectedUser())}/>
      <img src={selectedUser.profileURL} className="w-8 h-8 ml-2 rounded-full"/>
      <h3 className=' p-2'>{selectedUser.userName}</h3>
    </div>
  )
}

export default ChattingHeader
