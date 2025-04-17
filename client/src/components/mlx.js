"use client";

import { Dropicon, Plus, Search } from "@/public/icons/icons";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import img from "@/public/images/frnd.png";

const mockChats = [
  {
    id: 1,
    name: "Florencio Dorrance",
    lastMessage: "woohoooo",
    tag: "some content",
    time: "24m",
  },
  {
    id: 2,
    name: "Ariana Sparks",
    lastMessage: "Hey, are we meeting today?",
    tag: "urgent",
    time: "1h",
  },
  {
    id: 3,
    name: "John Legend",
    lastMessage: "Let’s gooo!",
    tag: "trip plan",
    time: "5h",
  },
];

const PersonalChats = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[20px] px-5 pt-7 shadow-md relative">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#00000033] lg:pb-6 pb-3">
        <div
          className="flex items-center space-x-2.5 relative"
          ref={dropdownRef}
        >
          <h3 className="lg:text-xl text-lg font-medium ">Message</h3>
          <button onClick={toggleDropdown} aria-label="Toggle dropdown">
            <span
              className={`transition-transform duration-300 ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <Dropicon />
            </span>
          </button>
          <span className="text-xs h-[22px] w-[27px] rounded-full bg-[#EDF2F7]  flex justify-center items-center">
            {mockChats.length}
          </span>

          {dropdownOpen && (
            <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-44 p-2">
              <button className="text-sm w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                Sort by Recent
              </button>
              <button className="text-sm w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                Sort by Unread
              </button>
              <button className="text-sm w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                Mark All Read
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => alert("Start new chat")}
          title="Start a new chat"
          className="lg:w-10 w-7 lg:h-10 h-7 rounded-full bg-green text-white flex justify-center items-center hover:bg-slate-600 transition-all duration-300"
        >
          <Plus />
        </button>
      </div>

      {/* Search Bar */}
      <div className="my-5 flex space-x-2 bg-[#F3F3F3] items-center lg:px-4 px-2 py-2 rounded-xl">
        <Search />
        <input
          type="text"
          placeholder="Search messages"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none w-full text-sm font-normal text-gray-700"
        />
      </div>

      {/* Chat List */}
      {filteredChats.length > 0 ? (
        filteredChats.map((chat, index) => (
          <div
            key={chat.id}
            className={`${
              index === 0 ? "bg-[#00BD900F]" : "hover:bg-[#00BD900F]"
            } flex justify-between items-center p-3 rounded-xl mb-3 transition-colors duration-200`}
          >
            <div className="flex items-center space-x-4">
              <Image
                src={img}
                width={48}
                height={48}
                alt="User"
                className="w-12 h-12 object-cover rounded-full"
              />
              <div>
                <h5 className="text-sm font-medium text-black">{chat.name}</h5>
                <h5 className="text-xs font-normal text-gray-600">
                  {chat.lastMessage}
                </h5>
                <button className="h-[22px] w-auto px-2 rounded-xl bg-[#F3F3F3] text-xs mt-1">
                  {chat.tag}
                </button>
              </div>
            </div>
            <span className="text-sm font-normal text-black opacity-30">
              {chat.time}
            </span>
          </div>
        ))
      ) : (
        <div className="text-center text-sm text-gray-400 py-6">
          No messages found
        </div>
      )}
    </div>
  );
};

export default PersonalChats;
