import SuccessIcon from '../../../components/SuccessIcon'
import FailureIcon from '../../../components/FailureIcon'
import LoadingIcon from '../../../components/LoadingIcon'
import { useAbortController } from '../../../hooks/useAbortController'
import { useDebounce } from '../../../hooks/useDebounce'
import { useDispatch, useSelector } from 'react-redux'
import { getConfirmPassword, getIsPasswordMatching, getPassword, setPassword,setConfirmPassword, getIsFetchingUniqueUserName, getUserName, setUserName, fetchUniqueUserName, getIsUniqueUserName, getIsSigningUp, signUp  } from '../store/signUpSlice.js'


const SignUpComponent = () => {
  const dispatch=useDispatch()
  const userName=useSelector(getUserName)
  const password=useSelector(getPassword)
  const confirmPassword=useSelector(getConfirmPassword)
  const isPasswordMatching=useSelector(getIsPasswordMatching)
  const fetchingUniqueUserName=useSelector(getIsFetchingUniqueUserName)
  const isUniqueUserName=useSelector(getIsUniqueUserName)
  const isSigningUp=useSelector(getIsSigningUp)
  const signal=useAbortController()
  const handleSignUp=(e)=>{
    e.preventDefault()
    dispatch(signUp({userName,password}))
  }
  const debouncedFetchUniqueUserName=useDebounce((userName,signal)=>{
    dispatch(fetchUniqueUserName(userName,signal))
  },2000)
  const handleUserNameChange=(e)=>{
    dispatch(setUserName(e.target.value))
    let tempSignal=signal()
    debouncedFetchUniqueUserName(userName,tempSignal)
  }
  return (
    <>
      <div className="relative flex items-center mt-8">
        <span className="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </span>
        <input onChange={handleUserNameChange} value={userName} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username"/>
        <span className="absolute right-3">{userName!==''&&(fetchingUniqueUserName?<LoadingIcon/>:(isUniqueUserName===false?<FailureIcon/>:<SuccessIcon/>))}</span>
      </div>

      <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>

        <h2 className="mx-3 text-gray-400">Profile Photo</h2>

        <input id="dropzone-file" type="file" className="hidden" />
      </label>

      <div className="relative flex items-center mt-6">
        <span className="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </span>

        <input type="email" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address"/>
      </div>

      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </span>

        <input onChange={(e)=>{dispatch(setPassword(e.target.value))}} value={password} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password"/>
      </div>

      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </span>

        <input  onChange={(e)=>{dispatch(setConfirmPassword(e.target.value))}} value={confirmPassword} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password"/>
        {confirmPassword!==''&&
        <span className="absolute right-3">{isPasswordMatching?<SuccessIcon/>:<FailureIcon/>}</span>
        }
      </div>
      <div className="mt-6">
        <button onClick={handleSignUp} className={`w-full px-6 py-3 flex justify-center text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform ${isSigningUp?'bg-gray-700 ':'bg-blue-500 hover:bg-blue-400'} rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
        {isSigningUp?<LoadingIcon/>:'sign in'}
      </button>
      </div>
    </>
  )
}
export default SignUpComponent
