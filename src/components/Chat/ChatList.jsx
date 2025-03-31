import React from 'react'

const ChatList = ({image,name,message}) => {
  return (
    <div className='w-full'>
        <div className='p-3 flex gap-3'>
        <img className='' src={image}/>
        <div className='w-full border-b border-black flex flex-col'>
            <p className='abeezee-regular text-base leading-6 font-black'>{name}</p>
            <p className='abeezee-regular text-[12px] leading-6 font-[#333333]'>{message}</p>
        </div>
        </div>

    </div>
  )
}
export default ChatList