import React, { useEffect } from 'react'
import TopSearchBar from './components/TopSearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFriends, getDisplayFriends, getFetching } from './store/friendsSlice'
import FriendCard from './components/FriendCard.jsx'
import MultiShimmerCard from './components/MultiShimmerCard.jsx'
const FriendsComponent = () => {
  const dispatch=useDispatch()
  const displayFriends=useSelector(getDisplayFriends)
  const isFetching=useSelector(getFetching)
  useEffect(()=>{
    dispatch(fetchFriends())
  },[])
  return (
    <div className="w-full md:w-1/3 min-w-[300px] max-h-screen overflow-y-auto no-scrollbar">
      <TopSearchBar/>
      {isFetching?<MultiShimmerCard num={5}/>:
      displayFriends==null?<MultiShimmerCard num={5}/>:
        displayFriends.length==0?<h1>Add friends</h1>:
      displayFriends.map((friend)=>{
        return <FriendCard key={friend.id} user={friend} />
      })}
    </div>
  )
}

export default FriendsComponent
