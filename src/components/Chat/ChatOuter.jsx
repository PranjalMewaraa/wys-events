import React, { useState, useEffect } from 'react';
import person1 from '../../assets/images/person-1.png';
import person2 from '../../assets/images/person-2.png';
import p2 from '../../assets/images/person2.svg';
import trip1 from '../../assets/images/trip1.svg';
import trip2 from '../../assets/images/trip2.svg';
import lens from '../../assets/images/lens.png';
import ChatList from './ChatList';
import { useChatList } from '../../utils/hooks/group';
import Layout from '../../Layout/Layout';
import DashLayout from '../../Layout/DashLayout';
import LayoutInnerMain from '../../Layout/LayoutInner';
import { useDirectChat } from '../../utils/hooks/DirectMessage';



const ChatOuter = () => {
  const [activeTab, setActiveTab] = useState('people'); // Default: People tab
const {pendingRequests}=useDirectChat();
  // Error state for groups
  const API_URL = "https://wysbackend.onrender.com/api"; // The API URL
  const token = localStorage.getItem("accessToken")

  // Fetch groups when the "Groups" tab is selected
  const { groups, people, loading, error } = useChatList(activeTab, token);




  return (
    <Layout>
      <LayoutInnerMain></LayoutInnerMain>
    <div className='w-full h-full '>
      <div className='w-9/10 container m-auto mt-6 border border-transparent rounded-2xl bg-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
      {Array.isArray(pendingRequests) && pendingRequests.length > 0 ? (
  pendingRequests.map(req => (
    <div key={req._id} className='min-w-9/10 m-5 flex flex-col gap-5 md:gap-9'>
      <p className='text-base abeezee-regular leading-6 md:text-4xl'>Requests</p>
      <div className='flex gap-5'>
        <div className='w-full flex flex-col gap-2 p-2 border border-transparent rounded-2xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]'>
          <div className='flex flex-col gap-2.5 items-start'>
            <img
              src={req.senderId.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <p className="text-black text-base">{req.senderId.name}</p>
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <p className="text-center text-gray-400 mt-4">No pending requests.</p>
)}

        
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
    </Layout>
  );
};

export default ChatOuter;
