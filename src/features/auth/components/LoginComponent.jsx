import { useDispatch, useSelector } from "react-redux"
import { getIsSigningIn, getLoginPassword, getLoginUserName, login, resetLoginData, setLoginPassword, setLoginUserName } from "../store/loginSlice"
import { useEffect } from "react"
import LoadingIcon from "../../../components/LoadingIcon"

const LoginComponent = () => {
  const userName=useSelector(getLoginUserName)
  const password=useSelector(getLoginPassword)
  const isSigningIn=useSelector(getIsSigningIn)
  const dispatch=useDispatch()
  const handleSignIn=(e)=>{
    e.preventDefault()
    if(isSigningIn){
      return
    }
    dispatch(login({userName,password}))
  }
  useEffect(()=>{
    return ()=>dispatch(resetLoginData())
  },[dispatch])
  return (
    <>
      <div className="relative flex items-center mt-8">
        <span className="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </span>
        <input onChange={(e)=>dispatch(setLoginUserName(e.target.value))} value={userName} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
      </div>
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </span>
        <input onChange={(e)=>dispatch(setLoginPassword(e.target.value))} value={password} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
      </div>
      <div className="mt-6">
        <button onClick={handleSignIn} className={`w-full px-6 py-3 flex justify-center text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform ${isSigningIn?'bg-gray-700 ':'bg-blue-500 hover:bg-blue-400'} rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
        {isSigningIn?<LoadingIcon/>:'sign in'}
      </button>
      </div>
    </>
  )
}

export default LoginComponent
