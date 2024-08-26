import { useRef } from "react"

export const useDebounce=(callback,value)=>{
  let timmer=useRef(null)
  return (...args)=>{
    clearTimeout(timmer.current)
    timmer.current=setTimeout(async()=>{
      await callback(...args)
    },value)
  }
}
