import LoginComponent from "./LoginComponent"
import SignUpComponent from "./SignUpComponent"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedForm,  toggleRegisterForm } from "../store/authSlice"
import { useEffect } from "react"
import { resetSignUpData } from "../store/signUpSlice"

const Registration = () => {
  const registration=useSelector(getSelectedForm)
  const dispatch=useDispatch()
  useEffect(()=>{
    return ()=>dispatch(resetSignUpData())
  },[dispatch])
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="https://res.cloudinary.com/dot9oyvrk/image/upload/WispherNetLogo_dui93x.png" alt="logo"/>
          </div>
          <div className="flex items-center justify-center mt-6">
            <span onClick={()=>dispatch(toggleRegisterForm('sign in'))} className={`w-1/3 pb-4 font-medium text-center ${registration==='sign up'?'text-white border-b':'text-white border-b-2 border-blue-400'} capitalize hover:cursor-pointer`}>
              sign in
            </span>
            <span onClick={()=>dispatch(toggleRegisterForm('sign up'))} className={`w-1/3 pb-4 font-medium text-center ${registration==='sign in'?'text-white border-b':'text-white border-b-2 border-blue-400'} capitalize  hover:cursor-pointer`}>
              sign up
            </span>
          </div>
          {registration==='sign up'?<SignUpComponent/>:<LoginComponent/>}
          <div className="mt-6 text-center ">
            <span onClick={()=>dispatch(toggleRegisterForm())} className="text-sm text-blue-500 hover:underline hover:cursor-pointer dark:text-blue-400">
              {registration==='sign up'?'Already have an account?':'Don\'t have an account?'}
            </span>
            </div>
        </form>
      </div>
    </section>
  )
}

export default Registration
