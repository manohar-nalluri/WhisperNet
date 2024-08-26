const MessageCountIndicator = ({count}) => {
  return (
    <span class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
      {count}
    </span>  )
}

export default MessageCountIndicator
