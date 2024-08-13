"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { LiaRobotSolid } from "react-icons/lia";
import { BiSolidMagicWand } from "react-icons/bi";
import { GoTrash } from "react-icons/go";

export function ChatBox() {
  const {
    messages,
    input,
    stop,
    setMessages,
    handleInputChange,
    handleSubmit,
  } = useChat();

  const clearMessages = () => {
    stop();
    setMessages([]);
  };

  return (
    <div className="flex flex-1 flex-col gap-5 container p-8 bg-white rounded-xl">
      <div className="flex w-full justify-between">
        <div>
          <button
            type="button"
            className="flex gap-1 items-center justify-center px-3 py-1 rounded-full border-[1px] border-neutral-300 text-gray-500"
          >
            <BiSolidMagicWand size={20} className="-ml-1" />
            <p className="">New Chat</p>
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={clearMessages}
            className="flex gap-1 items-center justify-center w-9 h-9 rounded-full border-[1px] border-neutral-300 text-gray-500"
          >
            <GoTrash size={14} />
          </button>
        </div>
      </div>
      <div className="flex flex-1 w-full flex-col gap-3 bg-gray-200/50 rounded-lg p-6 overflow-y-auto">
        {messages.length === 0 && (
          <div className="flex flex-1 justify-center items-center text-center flex-col">
            <p className="text-4xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-pink-500 via-indigo-500 to-blue-500 via-40%">
              Flowseph Chat
            </p>
            {/* <p>Discover I new way to learn more!</p> */}
            <p className="text-gray-500">Send a message to get started</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[40rem] ${
              message.role === "user" ? "self-end" : "self-start"
            }`}
          >
            {message.role === "user" ? (
              <div className="p-4 bg-white rounded-lg text-neutral-800">
                {message.content}
              </div>
            ) : (
              <div className="flex flex-row gap-3">
                <div className="w-10 h-10 flex justify-center items-center bg-gray-300/50 rounded-full shrink-0">
                  <LiaRobotSolid className="text-gray-500" size={22} />
                </div>
                <div className="p-4 bg-indigo-700 text-white rounded-lg self-start">
                  <ReactMarkdown className={"prose prose-invert"}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="py-3 px-5 outline-none flex-1 bg-white border-neutral-200 border-[1px] rounded-full text-neutral-900"
            placeholder="Tell me what you want?"
            autoFocus
          />
          <button className="text-white bg-gradient-to-r from-indigo-500 to-blue-500 px-6 rounded-full font-semibold border-[3px] border-white/50 ">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
