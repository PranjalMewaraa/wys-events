import React, { useState, useEffect } from 'react';
import person1 from '../../assets/images/person-1.png';
import person2 from '../../assets/images/person-2.png';
import p2 from '../../assets/images/person2.svg';
import trip1 from '../../assets/images/trip1.svg';
import trip2 from '../../assets/images/trip2.svg';
import lens from '../../assets/images/lens.png';
import ChatList from './ChatList';
import { useChatList } from '../../utils/hooks/group';



const ChatOuter = () => {
  const [activeTab, setActiveTab] = useState('people'); // Default: People tab

  // Error state for groups
  const API_URL = "https://wysbackend.onrender.com/api"; // The API URL
  const token = import.meta.env.VITE_AUTH_TOKEN

  // Fetch groups when the "Groups" tab is selected
  const { groups, people, loading, error } = useChatList(activeTab, token);


  return (
    <div className='w-full h-full bg-gray-100'>
      <div className='w-9/10 container m-auto mt-6 border border-transparent rounded-2xl bg-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
        <div className='min-w-9/10 m-5 flex flex-col gap-5 md:gap-9'>
          <p className='text-base abeezee-regular leading-6 md:text-4xl'>Seekers</p>
          <div className='flex gap-5'>
            <div className='w-1/3 flex flex-col gap-2 p-2 bg-[#F0F0F0] border border-transparent rounded-2xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
              <p className='abeezee-regular text-[10px] leading-6 md:text-xl'>Bike Trip</p>
              <div className='flex gap-2.5'>
                <img src={person1} />
                <img src={person2} />
              </div>
            </div>
            <div className='w-[50%] flex flex-col gap-2 p-2 bg-[#F0F0F0] border border-transparent rounded-2xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
              <p className='abeezee-regular text-[10px] leading-6 md:text-xl'>Car Ride</p>
              <div className='flex gap-2.5'>
                <img src={person1} />
                <img src={person2} />
                <img src={person1} />
                <img src={person2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full mt-14'>
        <div className='w-9/10 flex gap-10 items-center justify-evenly'>
          <button
            className={`w-1/3 ml-10 text-center abeezee-regular text-base ${activeTab === 'people' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('people')}
          >
            People
          </button>
          <button
            className={`w-1/3 abeezee-regular text-base text-center ${activeTab === 'group' ? 'border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab('group')}
          >
            Groups
          </button>
        </div>
      </div>

      <div className='w-full h-screen border border-transparent rounded-t-3xl bg-white drop-shadow-[0_-4px_6px_rgba(0,0,0,0.1)]'>
        <div className="w-9/10 m-auto mt-3 flex items-center gap-2 border-2 border-gray-400 rounded-lg px-3 py-2 focus-within:ring-2">
          <span className="text-gray-400">
            <img src={lens} />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className='h-full mb-40'>
     {activeTab=="group"?groups.map((group)=>(
      <ChatList key={group._id}
      image={group.image}
      name={group.groupName}
      eventId={group.eventId._id}
      activeTab="group"
      token={token}
      />
     )):
     people.map((user)=>(
      <ChatList
      key={user._id}
      image={user.avatar}
      name={user.name}
      userId={user._id}
      activeTab="people"
      token={token}
      />
     ))}

        </div>
      </div>
    </div>
  );
};

export default ChatOuter;
