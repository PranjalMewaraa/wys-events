import React, { useState } from 'react'
import person1 from '../../assets/images/person-1.png'

import ChatNav from './ChatNav'
import Modal from './Modal'
import Popup from './Popup'
const sender=[
    {image:person1,name:"Jhone Doe",Message:"Random text about the event some more random "},
    {image:person1,name:"varun",Message:"Description about the the profile, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
]
const ChatBox = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
  
    const isOverlayVisible = isModalOpen || isPopupOpen;
  return (
    <div className='w-full relative'>
         {isModalOpen || isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm"></div>
      )}
        <ChatNav setIsModalOpen={setIsModalOpen}/>
        {
            sender.map((person,index)=>(
                <div key={person.id || index} className='w-full flex mb-5 mt-5 ml-5'>
                <img className='w-[20px] h-[20px] self-end' src={person.image}/>
                <div className='w-3/5 flex flex-col gap-0.5 bg-[#333333] abeezee-regular p-3 rounded-xl rounded-bl-none'>
                    <p className='text-[#F38E1C] text-base leading-6'>{person.name}</p>
                    <p className='text-white text-[10px]'>{person.Message}</p>
                </div>
                
            </div>
            ))
        }
        <div className='flex flex-col items-end gap-5 mr-3'>
        <div className='w-3/5 flex flex-col gap-0.5 bg-[#F38E1C] abeezee-regular p-3 rounded-xl rounded-br-none '>
            <p className='text-white text-[10px]'>Description about the the profile, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
        </div>
        </div>
        {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onShowPopup={() => {
            setIsPopupOpen(true);
          }}
          className="z-[60]" // Higher than overlay

        />
      )}

      {/* Render Popup */}
      {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}
            className="z-[60]" // Higher than overlay
       />}
    </div>
  )
}

export default ChatBox