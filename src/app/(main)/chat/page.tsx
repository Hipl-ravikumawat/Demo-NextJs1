"use client";

import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage, setMessages } from "@/store/slices/chatSlice";
import { socket } from "@/services/socket";

const Chat = () => {
    const dispatch = useAppDispatch();

    const { messages } = useAppSelector((state) => state.chat);

    const [message, setMessage] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Current User
    const currentUser = typeof window !== "undefined" ? JSON.parse(
      localStorage.getItem("user") || "{}"
    ) : {};

    const currentUserId = currentUser?._id;

    // Testing Receiver
    const receiverId = "66a9f123abc4567890def105";

    // Register User
    useEffect(() => {
      if (currentUserId) {
        socket.emit(
          "register",
          currentUserId
        );
      }
    }, [currentUserId]);

    // Load Messages from LocalStorage
    useEffect(() => {
      const savedMessages = localStorage.getItem("chatMessages");
      if (savedMessages) {
        dispatch(
          setMessages(JSON.parse(savedMessages))
        );
      }
      setIsLoaded(true);

      console.log("savedMessages", savedMessages);
    }, [dispatch]);

    // Save Messages
    useEffect(() => {
      if (!isLoaded) return;

      localStorage.setItem(
        "chatMessages", JSON.stringify(messages)
      );
    }, [messages, isLoaded]);

    // Receive Message
    useEffect(() => {
      socket.on("receive_message", (data: any) => {
        dispatch(
          addMessage({
            id: data.id || Date.now(),
            senderId: data.senderId,
            receiverId: data.receiverId,
            text: data.message,
            createdAt: Date.now(),
          })
        );  
      });
      return () => {
        socket.off("receive_message");
      };
    }, [dispatch]);

    // Auto Scroll Bottom
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [messages]);

    const handleSend = () => {
      if (!message.trim()) return;
      const newMessage = {
        id: Date.now(),
        senderId: currentUserId,
        receiverId,
        text: message,
        createdAt: Date.now(),
      };

      // Show instantly
      dispatch(
        addMessage(newMessage)
      );

      // Send to Backend
      socket.emit("send_message",{
        senderId: currentUserId,
        receiverId,
        message,
      });

      setMessage("");
    };

    // function test() {
    //   var a = 10;
    // }

    if (true) {
      var a = 10;
    }
    
    console.log(a);

    return (
        <>
          <section className="bg-[#9DCCFF] pt-40 pb-20">
            <div className="max-w-container mx-auto">
              <h1 className="text-2xl font-bold text-center">Chat</h1>
            </div>
          </section>

          <div className="max-w-3xl mx-auto py-10">
            <div ref={chatContainerRef} className="border rounded-lg h-[400px] overflow-y-auto p-4 mb-4 bg-gray-50">
              {messages.map((msg: any, index: number) => (
                <div key={msg.id || index} className={`flex mb-3 ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] px-4 py-2 rounded-lg ${msg.senderId === currentUserId ? "bg-primary text-white" : "bg-white border border-gray-300"}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(
                  e.target.value
                )}
                onKeyDown={(e) => {
                  if (
                      e.key === "Enter"
                  ) {
                      e.preventDefault();
                      handleSend();
                  }
                }}
                className="border p-3 flex-1 rounded-lg outline-none"
                placeholder="Type message..."
              />
              <button
                type="button"
                onClick={handleSend}
                className="bg-primary px-6 py-3 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </>
    );
};

export default Chat;