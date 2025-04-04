import { useNavigate } from 'react-router-dom';
import { useChat } from '../../utils/hooks/message';
const ChatList = ({image,name}) => {
  const eventId="67e54a94840201363f001288"

  const navigate = useNavigate();
  const {messages}=useChat(eventId);
  const handleNavigation = () => {
    navigate(`/chats`, {
      state: {
        chatDetails: {
          name,
          image,
          participants: "3 out of 5 are going" 
        }
      }
    });
  };
  return (
    <div className='w-full cursor-pointer' onClick={handleNavigation}>
      <div className='w-full'>
        <div className='p-3 flex gap-3'>
        <img className='' src={image}/>
        <div className='w-full border-b border-black flex flex-col'>
            <p className='abeezee-regular text-base leading-6 font-black'>{name}</p>
            <p className='abeezee-regular text-[12px] leading-6 font-[#333333]'>
            {messages.length > 0 ? messages[messages.length - 1].content : "No messages yet"}
            </p>
        </div>
        </div>

    </div>
    </div>
  )
}
export default ChatList

// ChatList.jsx


