import { LiaUserFriendsSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingFriendRequests, filterFriends, getPendingFriendRequestPage,  setFriends,  togglePendingFriendRequestPage} from "../store/friendsSlice";
const TopSearchBar = () => {
  const showFriendRequestPage=useSelector(getPendingFriendRequestPage)
  const callback=()=>{}
  const dispatch=useDispatch()

  const handlePendingRequestPage=()=>{
    if(showFriendRequestPage){
      dispatch(togglePendingFriendRequestPage())
      dispatch(setFriends())
    }else{
      dispatch(togglePendingFriendRequestPage())
      dispatch(fetchPendingFriendRequests())
    }
  }

  const handleSearch=(e)=>{
    e.preventDefault()
    if(showFriendRequestPage){
      debounce(callback)
      return
    }
    dispatch(filterFriends(e.target.value))
  }

  return (
    <div className="display flex items-center justify-around m-2 ">
      <input type="text" placeholder='search' onChange={handleSearch} className="w-4/5 rounded-lg p-2"/>
      <LiaUserFriendsSolid onClick={handlePendingRequestPage} className="text-lg bg-black text-white w-6 h-full rounded-md "/>
    </div>
  )
}

export default TopSearchBar
