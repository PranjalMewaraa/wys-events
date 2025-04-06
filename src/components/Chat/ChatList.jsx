import { useNavigate } from 'react-router-dom';
import { useChatList } from '../../utils/hooks/group';
import { useDirectChat } from '../../utils/hooks/DirectMessage';
import { useGroupChat } from '../../utils/hooks/Groupmessage';

const ChatList = ({ image, name, activeTab,token ,userId,eventId}) => {
    const isGroupChat = !!eventId 
  
   
    const {
      messages,
    } = isGroupChat ? useGroupChat(eventId): useDirectChat(userId);
  const navigate = useNavigate();
  const handleNavigation = () => {
    if (activeTab === 'group') {
      navigate(`/chats/group/${eventId}`, {
        state: {
          chatDetails: {
            name,
            image,
            participants: "3 out of 5 are going"
          }
        }
      });
    } else {
      navigate(`/chats/user/${userId}`, {
        state: {
          chatDetails: {
            name,
            image
          }
        }
      });
    }
  };

  return (
    <div className='w-full cursor-pointer' onClick={handleNavigation}>
      <div className='w-full'>
        <div className='p-3 flex gap-3'>
          <img className='w-[50px] h-[50px] rounded-4xl' src={image} />
          <div className='w-full border-b border-black flex flex-col'>
            <p className='abeezee-regular text-base leading-6 font-black'>{name}</p>
            <p className='abeezee-regular text-[12px] leading-6 font-[#333333]'>
              {/* Optional: You can pass messages from props */}
              {messages.length > 0 ? messages[messages.length - 1].content : "No messages yet"}
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;


// ChatList.jsx


