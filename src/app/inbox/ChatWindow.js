"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';

const messages = [
    { type: 'sent', title: 'Vendor', text: 'Hello, I hope you received the product list I sent earlier.', time: '9:00 am', date: 'Yesterday' },
    { type: 'received', title: 'Seller', text: 'Yes, I did. I went through the list, and I have some questions.', time: '9:15 am', date: 'Yesterday' },
    { type: 'sent', title: 'Vendor', text: 'Sure, feel free to ask any questions you have.', time: '9:20 am', date: 'Yesterday' },
    { type: 'received', title: 'Seller', text: 'Could you clarify the bulk pricing for Product A?', time: '9:30 am', date: 'Yesterday' },
    { type: 'sent', title: 'Vendor', text: 'For Product A, the bulk pricing starts at orders of 100 units or more, with a 10% discount.', time: '9:35 am', date: 'Yesterday' },
    { type: 'note', title: 'Note', text: 'Bulk pricing clarified for Product A. Vendor offered a 10% discount for 100 units or more.', username: 'Vendor Team', time: '9:40 am', date: 'Yesterday', isNote: true },
    { type: 'received', title: 'Seller', text: 'Got it. Also, are there any promotional offers running currently?', time: '9:50 am', date: 'Yesterday' },
    { type: 'sent', title: 'Vendor', text: 'Yes, we have a 15% discount on Product B until the end of this week.', time: '10:00 am', date: 'Yesterday' },
    { type: 'received', title: 'Seller', text: 'Thanks for the information. Let’s schedule a meeting to finalize the order details.', time: '10:15 am', date: 'Yesterday' },
    { type: 'note', title: 'Note', text: 'Meeting scheduled with the seller to finalize order details for Product A and Product B.', username: 'Vendor Team', time: '10:30 am', date: 'Yesterday', isNote: true },
    { type: 'sent', title: 'Vendor', text: 'Absolutely. How about tomorrow at 2 pm?', time: '10:20 am', date: 'Yesterday' },
    { type: 'received', title: 'Seller', text: '2 pm works for me. Please send the meeting link.', time: '10:25 am', date: 'Yesterday' },
    { type: 'sent', title: 'Vendor', text: 'Great! Here is the link: meet.google.com/xyz-link', time: '10:30 am', date: 'Yesterday' },
    { type: 'received', title: 'Seller', text: 'Thanks, see you then.', time: '10:35 am', date: 'Yesterday' },
  ];
  

// const LinkPreview = () => (
//   <div className="flex items-center bg-green-200 p-3 rounded-lg shadow-md">
//     <img src="https://placehold.co/40x40" alt="Google Meet logo" className="w-10 h-10 mr-4" />
//     <div>
//       <div className="font-bold">Meet</div>
//       <p className="text-sm">
//         Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers.
//       </p>
//       <a href="https://meet.google.com/srv-csmx-yhj" className="text-blue-500">
//         meet.google.com/srv-csmx-yhj
//       </a>
//     </div>
//   </div>
// );

const Notes = ({ username,title, note,time, date }) => (
    <div className="flex flex-col items-start bg-customYellow p-4 rounded-lg shadow-md mb-4">
      <div className="text-sm font-bold mb-1">{username}</div>
      <div className="text-md font-semibold mb-2">{title}</div>
      <p>{note}</p>
       <div className="text-xs text-gray-500">{`${time} ${date}`}</div>
    </div>
  );
  

  const ChatMessage = ({ type, text, time, date, isNote, username, title }) => (
    <div className={`flex items-start mb-4 ${type === 'sent' ? 'justify-end' : 'justify-start'}`}>
      {isNote ? (
        // Notes styling
        <div className="bg-customYellow rounded-lg shadow-md w-full">
          <div className="font-bold p-4 bg-nextSilver rounded-sm">{title}</div>
          <div className="text-sm mt-2 px-4">{username}</div>
          <div className="mt-2 px-4">{text}</div>
          <div className="text-xs px-4 text-gray-500 mt-2 mb-2">{`${time} ${date}`}</div>
        </div>
      ) : (
        <>
          {type === 'received' && (
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 mr-4">
                <FontAwesomeIcon icon={faUser} size="1x" className="text-gray-700" />
              </div>
              <div className="bg-white p-4 rounded-lg max-w-xs shadow-md">
                <div className="font-bold text-sm mb-1">{title}</div>
                <div>{text}</div>
                <div className="text-xs text-gray-500 mt-2">{`${time} ${date}`}</div>
              </div>
            </div>
          )}
          {type === 'sent' && (
            <div className="flex items-center justify-end">
              <div className="bg-green-100 p-4 rounded-lg max-w-xs shadow-md">
                <div className="font-bold text-sm mb-1">{title}</div>
                <div>{text}</div>
                <div className="text-xs text-gray-500 mt-2">{`${time} ${date}`}</div>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 ml-4">
                <FontAwesomeIcon icon={faUserTie} size="1x" className="text-gray-700" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
  
  const ChatWindow = () => {
    return (
      <div className="h-[70vh] mb-2 flex flex-col p-4">
        <div className="flex-grow overflow-y-auto bg-gray-100 rounded-lg p-6">
          <div className="chat-container space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                type={msg.type}
                text={msg.text}
                time={msg.time}
                date={msg.date}
                isNote={msg.isNote}
                username={msg.username}
                title={msg.title}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default ChatWindow;
