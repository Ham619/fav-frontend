"use client";

import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';

const ChatWindow = ({ customerId,refreshChat }) => {
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`https://favcrm.softwareexato.com/api/CustomerDetails/${customerId}`);
        const result = await response.json();

        if (result.message === "request success" && result.data.customerEmails) {
          const formattedMessages = result.data.customerEmails.map(email => ({
            type: email.EmailStatus === "sent" ? "sent" : "received",
            subject: email.Subject, // Use subject field
            text: email.Content,
            time: new Date(email.DateTime).toLocaleTimeString(),
            date: new Date(email.DateTime).toLocaleDateString(),
            timestamp: new Date(email.DateTime),
            isNote: email.notes.length > 0,
            username: `${result.data.FirstName} ${result.data.LastName}`,
            notes: email.notes
            .map(note => ({
              title: note.Title,
              text: note.Note,
              time: new Date(note.DateTime).toLocaleTimeString(),
              date: new Date(note.DateTime).toLocaleDateString(),
              timestamp: new Date(note.DateTime),
              username: `${result.data.FirstName} ${result.data.LastName}`
            }))
            .sort((a, b) => a.timestamp - b.timestamp) // Sort notes by timestamp within each message
        }));

          const sortedMessages = formattedMessages.sort((a, b) => a.timestamp - b.timestamp);
          setMessages(sortedMessages);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMessages();
  }, [customerId,refreshChat]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="h-[70vh] mb-2 flex flex-col p-4">
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto bg-gray-100 rounded-lg p-6">
        <div className="chat-container space-y-4">
          {messages.map((msg, index) => (
            <div key={index}>
              <ChatMessage
                type={msg.type}
                text={msg.text}
                time={msg.time}
                date={msg.date}
                username={msg.username}
                subject={msg.subject}
              />
              {msg.notes.map((note, idx) => (
                <Notes key={`note-${index}-${idx}`} {...note} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({ type, text, time, date, username, subject }) => (
  <div className={`flex items-start mb-4 ${type === 'sent' ? 'justify-end' : 'justify-start'}`}>
    <MessageBubble type={type} subject={subject} text={text} time={time} date={date} />
  </div>
);

const MessageBubble = ({ type, subject, text, time, date }) => (
  <div className={`flex items-center ${type === 'sent' ? 'justify-end' : 'justify-start'}`}>
    {type === 'received' && (
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="text-gray-700" />
        </div>
        <div className="bg-white p-4 rounded-lg max-w-xs shadow-md">
          <div className="font-bold text-sm mb-1">{subject}</div>
          <div>{text}</div>
          <div className="text-xs text-gray-500 mt-2">{`${time} ${date}`}</div>
        </div>
      </div>
    )}
    {type === 'sent' && (
      <div className="flex items-center justify-end">
        <div className="bg-green-100 p-4 rounded-lg max-w-xs shadow-md">
          <div className="font-bold text-sm mb-1">{subject}</div>
          <div>{text}</div>
          <div className="text-xs text-gray-500 mt-2">{`${time} ${date}`}</div>
        </div>
        <div className="w-12 h-12 rounded-full bg-gray-200 ml-4 flex items-center justify-center">
          <FontAwesomeIcon icon={faUserTie} className="text-gray-700" />
        </div>
      </div>
    )}
  </div>
);

const Notes = ({ username, title, text, time, date }) => (
  <div className="flex flex-col items-start bg-yellow-100 p-4 rounded-lg shadow-md mb-4">
    <div className="text-sm font-bold mb-1">{username}</div>
    <div className="text-md font-semibold mb-2">{title}</div>
    <p>{text}</p>
    <div className="text-xs text-gray-500">{`${time} ${date}`}</div>
  </div>
);

export default ChatWindow;
