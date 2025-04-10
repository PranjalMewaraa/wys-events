import { useNavigate } from "react-router-dom";
import { useDirectChat } from "../../utils/hooks/DirectMessage";
import { useGroupChat } from "../../utils/hooks/Groupmessage";
import MessageRenderer from "../Chat/MessageRenderer"; // Adjust path if needed

const ChatList = ({ image, name, activeTab, token, userId, eventId, groupId }) => {
  const isGroupChat = !!eventId;

  const { messages } = isGroupChat
    ? useGroupChat(eventId)
    : useDirectChat(userId);

  const navigate = useNavigate();

  const handleNavigation = () => {
    if (activeTab === "group") {
      navigate(`/chats/group/${groupId}/${eventId}`, {
        state: {
          chatDetails: {
            name,
            image,
          },
        },
      });
    } else {
      navigate(`/chats/user/${userId}`, {
        state: {
          chatDetails: {
            name,
            image,
          },
        },
      });
    }
  };

  const parseMessage = (msg) => {
    try {
      return JSON.parse(msg);
    } catch {
      return { type: "text", content: msg };
    }
  };

  return (
    <div className="w-full cursor-pointer" onClick={handleNavigation}>
      <div className="w-full">
        <div className="p-3 flex gap-3">
          <img className="w-[50px] h-[50px] rounded-4xl object-cover" src={image} alt={name} />
          <div className="w-full border-b border-black flex flex-col overflow-hidden">
            <p className="abeezee-regular text-base leading-6 font-black">{name}</p>
            <div className="abeezee-regular text-[12px] leading-6 text-[#333333] truncate max-w-[200px]">
              {messages.length > 0 ? (
                <MessageRenderer message={parseMessage(messages[messages.length - 1].content)} />
              ) : (
                "No messages yet"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
