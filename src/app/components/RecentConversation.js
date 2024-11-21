import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";

const RecentConversationsCard = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Conversations Data
  const conversations = [
    { name: "John Doe", message: "Hey, how are you?", date: "2023-10-01 10:30 AM" },
    { name: "Jane Smith", message: "Can we reschedule our meeting?", date: "2023-10-01 09:15 AM" },
    { name: "Alice Johnson", message: "Don't forget about the deadline tomorrow.", date: "2023-09-30 04:45 PM" },
    { name: "Bob Brown", message: "I will send you the documents by EOD.", date: "2023-09-30 02:30 PM" },
    { name: "Charlie Davis", message: "Let's catch up over coffee.", date: "2023-09-29 11:00 AM" },
    { name: "David Wilson", message: "Are you available for a call?", date: "2023-09-28 03:20 PM" },
    { name: "Emma Thomas", message: "Please review the attached document.", date: "2023-09-27 01:10 PM" },
    { name: "Frank Harris", message: "Meeting has been postponed.", date: "2023-09-26 05:00 PM" },
  ];

  return (
    <div className="max-w-sm mx-auto mt-8 mb-8 p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-gray-600 mb-2 mr-2">Recent Conversations</h2>
        <FontAwesomeIcon
          icon={isExpanded ? faCaretUp : faCaretDown}
          className="cursor-pointer text-gray-600"
          onClick={toggleExpand}
        />
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <>
          {/* Search Box */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Type here..."
              className="w-full p-2 border rounded-md text-black"
            />
            <div className="absolute right-2 top-2 flex space-x-2">
              <button className="p-1">
                <FontAwesomeIcon icon={faFilter} size="md" />
              </button>
              <button className="p-1">
                <FontAwesomeIcon icon={faSort} size="md" />
              </button>
            </div>
          </div>

          {/* Conversations List */}
          <div className="space-y-4 h-64 overflow-y-auto">
            {conversations.map((conversation, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded">
                <div className="font-semibold text-base text-black">{conversation.name}</div>
                <div className="text-sm text-gray-600">{conversation.message}</div>
                <div className="text-xs text-gray-500">{conversation.date}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentConversationsCard;
