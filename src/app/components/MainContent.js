// src/components/MainContent.js

import { useState, useRef } from "react";
import ChatWindow from "./../inbox/ChatWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification } from "antd";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { sendEmail, saveNote } from "../utils/api";

const MainContent = ({
  selectedCustomer,
  refreshChat,
  setRefreshChat,
  getCustomerAttribute,
  latestEmail,
  setLatestEmail,
}) => {
  const [note, setNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  //   const [refreshChat, setRefreshChat] = useState(false);
  const [viewMode, setViewMode] = useState("Conversations & Notes");

  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  const [isStrikethroughActive, setIsStrikethroughActive] = useState(false);

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  const handleSendEmail = async () => {
    if (!selectedCustomer) {
      alert("Select a customer to send an email.");
      return;
    }

    const emailData = {
      Id: selectedCustomer.Id,
      Subject: subject,
      Body: body,
    };

    try {
      await sendEmail(emailData);
      // alert("Email sent successfully!");
      // Show notification instead of alert
      notification.open({
        message: "Email Successfully Sent",
        description: "The email has been sent successfully.",
        duration: 3,
        showProgress: true,
        placement: "topRight",
      });

      // Refresh customer attribute to update email list
      const updatedAttributes = await getCustomerAttribute(selectedCustomer.Id);
      if (updatedAttributes && updatedAttributes.customerEmails.length > 0) {
        setLatestEmail(updatedAttributes.customerEmails[0].EmailId);
      }

      // Refresh chat
      setRefreshChat((prev) => !prev);
      setSubject("");
      setBody("");
      closeReplyModal();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  const handleSaveNote = async () => {
    if (!latestEmail || !note.trim() || !noteTitle.trim()) return;
    try {
      await saveNote({
        CustomerEmailId: latestEmail,
        Note: note,
        Title: noteTitle,
      });
      notification.open({
        message: "Note Added Successfully",
        duration: 3,
        showProgress: true,
        placement: "topRight",
      });
      setRefreshChat((prev) => !prev);
      setNote("");
      setNoteTitle("");
      closeNotesModal();
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const editorRef = useRef(null);

  const toggleFormatting = (command) => {
    document.execCommand(command, false, null);
    updateToolbarStatus();
  };

  const updateToolbarStatus = () => {
    setIsBoldActive(document.queryCommandState("bold"));
    setIsItalicActive(document.queryCommandState("italic"));
    setIsUnderlineActive(document.queryCommandState("underline"));
    setIsStrikethroughActive(document.queryCommandState("strikeThrough"));
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      document.execCommand("createLink", false, url);
    }
  };

  const openNotesModal = () => {
    setIsNotesModalOpen(true);
  };

  const closeNotesModal = () => {
    setIsNotesModalOpen(false);
  };

  const openReplyModal = () => {
    setIsReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
  };

  const handleViewModeChange = (e) => {
    setViewMode(e.target.value);
  };

  return (
    <div className="flex-grow p-6 w-1/2 bg-white rounded-lg h-[87vh] shadow-lg relative">
      <div className="flex justify-between mb-4">
        {/* <select
          className="text-pink-500 cursor-pointer bg-white border-2 border-pink-500 px-2 py-1 focus:outline-none rounded-sm text-sm font-semibold"
          defaultValue="Conversations & Notes"
        >
          <option value="Conversations & Notes">Conversations & Notes</option>
          <option value="Notes">Notes</option>
          <option value="Conversations">Conversations</option>
        </select> */}
         <select
          className="text-pink-500 cursor-pointer bg-white border-2 border-pink-500 px-2 py-1 focus:outline-none rounded-sm text-sm font-semibold"
          value={viewMode}
          onChange={handleViewModeChange}
        >
          <option value="Conversations & Notes">Conversations & Notes</option>
          <option value="Notes">Notes</option>
          <option value="Conversations">Conversations</option>
        </select>
        <div className="flex space-x-2">
          <button className="px-4 py-2 font-semibold text-white text-sm rounded-sm bg-gradient-to-br from-pink-500 to-purple-600">
            Snooze
          </button>
          <button className="px-4 py-2 font-semibold text-white text-sm rounded-sm bg-gradient-to-br from-pink-500 to-purple-600">
            Close
          </button>
        </div>
      </div>

      <div className="flex-grow relative">
        {selectedCustomer ? (
          <ChatWindow
            customerId={selectedCustomer.Id}
            refreshChat={refreshChat}
            viewMode={viewMode}
          />
        ) : (
          <div className="flex items-center justify-center h-[70vh]">
            <p className="text-gray-500 text-center">
              Select a customer to view chat
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          className="px-4 py-2 font-semibold text-pink-500 text-sm rounded-sm border-2 border-pink-500 bg-white"
          onClick={openNotesModal}
        >
          Add Note
        </button>
        <button
          className="px-4 py-2 font-semibold text-white text-sm rounded-sm bg-gradient-to-br from-pink-500 to-purple-600"
          onClick={openReplyModal}
        >
          Write a Reply
        </button>
      </div>

      {/* Reply Modal */}
      {isReplyModalOpen && (
        <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-lg shadow">
          <div className="mb-2">
            <label className="block text-gray-700 text-[0.9rem]">From:</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-[0.9rem]">To:</label>
            <div className="w-full border border-gray-300 p-2 rounded bg-gray-100 text-gray-700">
              {selectedCustomer?.EmailId || "No email selected"}
            </div>
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-[0.9rem]">
              Subject:
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded text-black"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-[0.9rem]">Email:</label>
            <div
              contentEditable
              className="w-full border border-gray-300 p-2 rounded min-h-[100px] text-black"
              placeholder="Write Email Here..."
              ref={editorRef}
              onInput={(e) => setBody(e.currentTarget.textContent)}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {/* Bold Button */}
              <button
                className={`p-2 rounded ${
                  isBoldActive ? "bg-gray-300" : "text-black"
                }`}
                onClick={() => toggleFormatting("bold")}
              >
                <FontAwesomeIcon icon={faBold} size="md" />
              </button>
              {/* Italic Button */}
              <button
                className={`p-2 rounded ${
                  isItalicActive ? "bg-gray-300" : "text-black"
                }`}
                onClick={() => toggleFormatting("italic")}
              >
                <FontAwesomeIcon icon={faItalic} size="md" />
              </button>
              {/* Underline Button */}
              <button
                className={`p-2 rounded ${
                  isUnderlineActive ? "bg-gray-300" : "text-black"
                }`}
                onClick={() => toggleFormatting("underline")}
              >
                <FontAwesomeIcon icon={faUnderline} size="md" />
              </button>
              {/* Strikethrough Button */}
              <button
                className={`p-2 rounded ${
                  isStrikethroughActive ? "bg-gray-300" : "text-black"
                }`}
                onClick={() => toggleFormatting("strikeThrough")}
              >
                <FontAwesomeIcon icon={faStrikethrough} size="md" />
              </button>
              {/* Link Button */}
              <button
                className="p-2 rounded text-black"
                onClick={() => insertLink()}
              >
                <FontAwesomeIcon icon={faLink} size="md" />
              </button>
            </div>
            <div>
              <button
                className="px-4 py-1.5 mr-2 font-semibold text-pink-500 text-sm rounded-sm bg-white border-2 border-pink-500"
                onClick={closeReplyModal}
              >
                Discard
              </button>
              <button
                className="px-4 py-2 font-semibold text-white text-sm rounded-sm bg-gradient-to-br from-pink-500 to-purple-600"
                onClick={handleSendEmail}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {isNotesModalOpen && (
        <div className="absolute bottom-0 left-0 right-0 bg-customYellow rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Write Title..."
            className="w-full px-3 py-2 mb-2 bg-nextSilver border-none outline-none text-black"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
          <div
            contentEditable
            className="w-full px-3 py-1 h-32 bg-customYellow border-none outline-none text-black"
            placeholder="Type Something Here..."
            onInput={(e) => setNote(e.currentTarget.innerText)}
          ></div>
          <div className="flex justify-between items-center mt-2 mb-2">
            <div className="flex space-x-3 ml-2 text-gray-600">
              {/* Bold Button */}
              <button
                className={`p-2 rounded ${isBoldActive ? "bg-gray-300" : ""}`}
                onClick={() => toggleFormatting("bold")}
              >
                <FontAwesomeIcon icon={faBold} size="md" />
              </button>
              {/* Italic Button */}
              <button
                className={`p-2 rounded ${isItalicActive ? "bg-gray-300" : ""}`}
                onClick={() => toggleFormatting("italic")}
              >
                <FontAwesomeIcon icon={faItalic} size="md" />
              </button>
              {/* Underline Button */}
              <button
                className={`p-2 rounded ${
                  isUnderlineActive ? "bg-gray-300" : ""
                }`}
                onClick={() => toggleFormatting("underline")}
              >
                <FontAwesomeIcon icon={faUnderline} size="md" />
              </button>
              {/* Strikethrough Button */}
              <button
                className={`p-2 rounded ${
                  isStrikethroughActive ? "bg-gray-300" : ""
                }`}
                onClick={() => toggleFormatting("strikeThrough")}
              >
                <FontAwesomeIcon icon={faStrikethrough} size="md" />
              </button>
              {/* Link Button */}
              <button
                className="p-2 rounded text-gray-500"
                onClick={() => insertLink()}
              >
                <FontAwesomeIcon icon={faLink} size="md" />
              </button>
            </div>
            <div className="flex space-x-2 p-2">
              <button
                className="px-4 py-1.5 mr-2 font-semibold text-customBrown text-sm rounded-sm bg-customYellow border-2 border-customBrown"
                onClick={closeNotesModal}
              >
                Discard
              </button>
              <button
                className="px-4 py-2 font-semibold text-white text-sm rounded-sm bg-customBrown"
                onClick={handleSaveNote}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
