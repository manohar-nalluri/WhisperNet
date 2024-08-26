import { useDispatch, useSelector } from 'react-redux'
import BottomBar from './components/BottomBar'
import ChattingDisplay from './components/ChattingDisplay'
import ChattingHeader from './components/ChattingHeader'
import { getSelectedUser } from './store/chatSlice'
import ConnectingPeersAnimations from './components/connectingPeersAnimations'
import AppLogo from './components/AppLogo'

const ChattingComponent = () => {
  const selectedUser=useSelector(getSelectedUser)
  const connectionState=useSelector((state)=>{
    if(!selectedUser){
      return false
    }
    if(state.connection[selectedUser.userName]){
      return state.connection[selectedUser.userName].connected
    }
  })
  const dispatch=useDispatch()

  return (
    !selectedUser?
      <AppLogo/>:
      <div className="w-full md:w-2/3 flex flex-col h-full max-h-screen  justify-between">
        <div className="flex flex-col">
          <ChattingHeader />
          {connectionState !== 'connected' ? (
            <ConnectingPeersAnimations />
          ) : (
              <ChattingDisplay />
            )}
        </div>
        <BottomBar className="sticky bottom-0" />
      </div>  )
}

export default ChattingComponent
