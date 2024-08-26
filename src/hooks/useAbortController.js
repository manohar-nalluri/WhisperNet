import { useRef } from "react";

export const useAbortController = () => {
  let controller=useRef()
  return ()=>{
    if(controller.current){
      controller.current.abort();
    }
    controller.current=new AbortController();
    return controller.current.signal;
  }
};
