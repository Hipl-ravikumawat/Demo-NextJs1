"use client";

import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage, setMessages } from "@/store/slices/chatSlice";

const Chat = () => {
    const dispatch = useAppDispatch();

    const { messages } = useAppSelector((state) => state.chat);

    const [message, setMessage] = useState("");

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const savedMessages = localStorage.getItem("chatMessages");

        if (savedMessages) {
            dispatch(
                setMessages(
                    JSON.parse(savedMessages)
                )
            );
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem(
            "chatMessages",
            JSON.stringify(messages)
        );
    }, [messages]);

    const handleSend = () => {
        if (!message.trim()) return;
        const newMessage = {
            id: Date.now(),
            sender: "You",
            text: message,
            createdAt: Date.now(),
        };
        dispatch(addMessage(newMessage));
        setMessage("");
    };

    return (
        <>
            <section className='bg-[#9DCCFF] pt-40 pb-20'>
                <div className="max-w-container mx-auto">
                    <h1 className="text-2xl font-bold mb-5 text-center">Chat</h1>
                </div>
            </section>

            <div className="max-w-3xl mx-auto py-10">
                <div
                    ref={chatContainerRef}
                    className="border rounded-lg h-[400px] overflow-y-auto p-4 mb-4 bg-gray-50"
                >
                    {messages.map((msg: any) => (
                        <div key={msg.id} className={`flex mb-3 ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] px-4 py-2 rounded-lg ${msg.sender === "You" ? "bg-primary text-white" : "bg-white border border-gray-300"}`}>
                                <p className="text-xs opacity-70 mb-1">
                                    {msg.sender}
                                </p>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) =>
                            setMessage(e.target.value)
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
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