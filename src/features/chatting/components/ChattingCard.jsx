const ChattingCard = ({message}) => {
  return (
    <div className={` p-2  text-lg text-white bg-blue-500 break-words rounded-t-xl max-w-[70%] m-2 w-fit ${message.received?'mr-auto rounded-br-xl':'ml-auto rounded-bl-xl'}`}>{message.data}</div>
  )
}

export default ChattingCard
