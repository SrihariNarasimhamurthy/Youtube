import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomName, genarateRandomMessage } from "../utils/helper";

const LiveChat = () => {
  const dispatch = useDispatch();
  const [liveMessage, setLiveMessage] = useState("");
  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      //API Polling
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: genarateRandomMessage(20),
        })
      );
    }, 1500);

    return () => clearInterval(i);
  }, []);
  return (
    <>
      {/* Chat Display */}
      <div className="w-full h-[400px] sm:h-[450px] px-4 lg:ml-10 py-2 border border-black rounded-lg overflow-y-scroll flex flex-col-reverse bg-white">
        <div>
          {chatMessages.map((chat, index) => (
            <ChatMessage key={index} name={chat.name} message={chat.message} />
          ))}
        </div>
      </div>

      {/* Message Input */}
      <form
        className="w-full px-4 lg:ml-10 mt-3 border border-black rounded-lg p-3 flex flex-wrap gap-3 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "User",
              message: liveMessage.trim(),
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="flex-1 min-w-[200px] max-w-[24rem] p-2 border border-black rounded-lg"
          type="text"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
          placeholder="Chat..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-100 border border-black rounded-lg hover:bg-green-200"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default LiveChat;
