"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "antd";
import ChatWindow from "./ChatWindow";
import {
  faHome,
  faEnvelope,
  faUsers,
  faRocket,
  faWrench,
  faMagnifyingGlass,
  faArrowUp,
  faFilter,
  faUser,
  faPhone,
  faMoneyBill,
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faListUl,
  faListOl,
  faLink,
  faSort,
  faList,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import {
  fetchCustomers,
  fetchOrders,
  sendEmail,
  saveNote,
  fetchCustomerAttribute,
} from "../utils/api";

export default function Inbox() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customerAttribute, setCustomerAttribute] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState(null);
  const [note, setNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [refreshChat, setRefreshChat] = useState(false);

  // State for latest email
  const [latestEmail, setLatestEmail] = useState(0);

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isNotesModelOpen, setIsNotesModalOPen] = useState(false);

  // Code for functionality
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  const [isStrikethroughActive, setIsStrikethroughActive] = useState(false);

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

  const openReplyModal = () => {
    setIsReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
  };

  const openNotesModal = () => {
    setIsNotesModalOPen(true);
  };

  const closeNotesModal = () => {
    setIsNotesModalOPen(false);
  };

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        const result = await fetchCustomers();
        setCustomers(Array.isArray(result.data) ? result.data : [result.data]);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };
    getCustomers();
  }, []);

  const getCustomerAttribute = async (customerId) => {
    try {
      setLoading(true);
      const result = await fetchCustomerAttribute(customerId);
      console.log("Customer Attributes data:", result);

      const customerAttributesArray = result.data || [];
      setCustomerAttribute(customerAttributesArray);
      return customerAttributesArray;
    } catch (error) {
      console.error("Error fetching customer attributes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerClick = async (customer) => {
    setSelectedCustomer(customer);
    setLoading(true);

    try {
      // Fetch orders for the selected customer
      const ordersResult = await fetchOrders(customer.CustomerId);
      setOrders(ordersResult.data?.orderData || []);

      // Fetch and update customer attributes
      const customerAttributes = await getCustomerAttribute(customer.Id);
      if (customerAttributes) {
        // Merge selected customer with additional attributes
        setSelectedCustomer((prev) => ({
          ...prev,
          customerEmails: customerAttributes.customerEmails || [],
          data: {
            ...prev.data,
            EmailId: customerAttributes.data?.EmailId,
          },
        }));

        const emails = customerAttributes.customerEmails || [];
        setLatestEmail(emails.length > 0 ? emails[0]?.EmailId : 1);
      }
    } catch (error) {
      console.error("Error handling customer click:", error);
    } finally {
      setLoading(false);
    }
  };

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
      alert("Email sent successfully!");

      // Refresh customer attribute to update email list
      const updatedAttributes = await getCustomerAttribute(selectedCustomer.Id);
      if (updatedAttributes && updatedAttributes.customerEmails.length > 0) {
        setLatestEmail(updatedAttributes.customerEmails[0].EmailId);
      }

      // Refresh chat
      setRefreshChat((prev) => !prev);
      setSubject("");
      setBody("");
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
      setRefreshChat((prev) => !prev);
      setNote("");
      setNoteTitle("");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  };

  const formatDate1 = (dateString) => {
    const dateParts = dateString.split("-");
    const day = String(dateParts[2]).padStart(2, "0");
    const month = String(dateParts[1]).padStart(2, "0");
    const year = String(dateParts[0]).slice(-2); // Get the last two digits of the year

    return `${day}/${month}/${year}`;
  };

  console.log("Latest Email", latestEmail);

  return (
    <div className="flex flex-grow flex-col">
      {/* Top Bar with Customers and Profile Overview */}
      <div className="flex justify-between items-center p-1 mt-4 ml-4">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-[#37e691] text-base">Profile Overview</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-grow space-x-4 p-2 px-4">
        {/* Left Sidebar */}
        <div className="bg-white w-1/4 overflow-scroll h-[90vh] p-6 rounded-lg shadow-lg">
          {/* Search Conversation Card */}
          <div className="bg-gray-100 p-4 rounded-sm shadow-md mb-6">
            <div className="relative">
              <input
                type="text"
                className="w-full p-2 pl-10 pr-4 border rounded-md"
                placeholder="Search Conversation..."
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FontAwesomeIcon
                  className="text-gray-500"
                  icon={faMagnifyingGlass}
                />
              </div>
            </div>
          </div>

          {/* Dropdown and Icons Section Card */}
          <div className=" p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <select
                className="text-gray-700 border-gray-400 px-2 py-1 focus:outline-none rounded-md"
                defaultValue="Open"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>

              <div className="flex items-center space-x-1 ml-2">
                <span className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded">
                  <FontAwesomeIcon icon={faArrowUp} size="sm" />
                </span>
                <span className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded">
                  <FontAwesomeIcon icon={faFilter} size="sm" />
                </span>
              </div>
            </div>
            <div></div>
            {/* Conditionally render skeleton or customer data */}
            {loading ? (
              <Skeleton active paragraph={{ rows: 5 }} />
            ) : (
              customers.map((customer, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 shadow rounded mb-6 cursor-pointer"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12">
                      <FontAwesomeIcon icon={faUser} size="lg" />
                    </div>

                    <div className="ml-4 mr-2 flex-wrap">
                      <h2 className="font-semibold">
                        {customer.FirstName} {customer.LastName}
                      </h2>
                      <p className="text-[0.5rem] text-gray-500 mb-1 text-wr">
                        {customer.EmailId}
                      </p>
                      <p className="text-[0.65rem] text-gray-500">
                        {customer.FirstName} is a long-time customer with a
                        history of high-value purchases.
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6 w-1/2 bg-white rounded-lg h-[90vh] shadow-lg relative">
          <div className="flex justify-between mb-4">
            <select
              className="text-pink-500 cursor-pointer bg-white border-2 border-pink-500 px-2 py-1 focus:outline-none rounded-sm text-sm font-semibold"
              defaultValue="Conversations & Notes"
            >
              <option value="Conversations & Notes">
                Conversations & Notes
              </option>
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
          {isReplyModalOpen && (
            <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-lg shadow">
              <div className="mb-2">
                <label className="block text-gray-700 text-[0.9rem]">
                  From:
                </label>
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
                  className="w-full border border-gray-300 p-2 rounded"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-[0.9rem]">
                  Email:
                </label>
                <div
                  contentEditable
                  className="w-full border border-gray-300 p-2 rounded min-h-[100px]"
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
                      isBoldActive ? "bg-gray-300" : ""
                    }`}
                    onClick={() => toggleFormatting("bold")}
                  >
                    <FontAwesomeIcon icon={faBold} size="md" />
                  </button>
                  {/* Italic Button */}
                  <button
                    className={`p-2 rounded ${
                      isItalicActive ? "bg-gray-300" : ""
                    }`}
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

          {isNotesModelOpen && (
            <div className="absolute bottom-0 left-0 right-0 bg-customYellow rounded-lg shadow-md">
              <input
                type="text"
                placeholder="Write Title..."
                className="w-full px-3 py-2 mb-2 bg-nextSilver border-none outline-none"
                value={noteTitle} // Use the new title state
                onChange={(e) => setNoteTitle(e.target.value)}
              />
              <div
                contentEditable
                className="w-full px-3 py-1 h-32 bg-customYellow border-none outline-none"
                placeholder="Type Something Here..."
                onInput={(e) => setNote(e.currentTarget.innerText)}
              ></div>
              <div className="flex justify-between items-center mt-2 mb-2">
                <div className="flex space-x-3 ml-2 text-gray-600">
                  {/* Bold Button */}
                  <button
                    className={`p-2 rounded ${
                      isBoldActive ? "bg-gray-300" : ""
                    }`}
                    onClick={() => toggleFormatting("bold")}
                  >
                    <FontAwesomeIcon icon={faBold} size="md" />
                  </button>
                  {/* Italic Button */}
                  <button
                    className={`p-2 rounded ${
                      isItalicActive ? "bg-gray-300" : ""
                    }`}
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

        {/* Right Sidebar */}
        <div className="w-1/5 overflow-scroll h-[90vh]">
          {" "}
          {/* Ensure full height for scrolling */}
          {customerAttribute ? (
            <div className="mb-6 p-4 rounded-lg shadow-lg bg-white sticky top-0 z-10">
              {/* Display selected customer details */}
              <div className="flex justify-start items-center mb-4">
                <h2 className="text-blue-600 text-lg font-bold">
                  {customerAttribute.FirstName} {selectedCustomer?.LastName}
                </h2>

                <div className="flex space-x-2 ml-3">
                  <button className="px-2 py-1 bg-green-400 text-white rounded-sm text-xs font-semibold">
                    Loyal
                  </button>
                  <button className="px-2 py-1 bg-yellow-400 text-white rounded-sm text-xs font-semibold">
                    VIP
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2 text-gray-600">
                    <FontAwesomeIcon icon={faEnvelope} size="sm" />
                  </span>
                  <p className="text-sm pt-1">
                    {customerAttribute.EmailId || "N/A"}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2 text-gray-600">
                    <FontAwesomeIcon icon={faPhone} size="sm" />
                  </span>
                  <p className="text-sm pt-1">
                    {customerAttribute.Phone || "N/A"}
                  </p>
                </div>

                <div className="flex items-center">
                  <span className="w-4 h-4 mr-2 text-gray-600">
                    <FontAwesomeIcon icon={faMoneyBill} size="sm" />
                  </span>
                  <p className="text-sm pt-1">
                    Total Spent: ${customerAttribute.TotalOrderValue || "0"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Select a customer to view details</p>
          )}
          {/* Middle Card: Attributes */}
          {customerAttribute ? (
            <div className="mb-6 p-4 rounded-lg shadow-lg bg-white">
              <h3 className="font-bold text-gray-600 mb-1 pl-1">Attributes</h3>
              {/* Search Box */}
              <input
                type="text"
                placeholder="Type here"
                className="w-full h-7 p-2 mb-3 text-sm border rounded-sm border-gray-300 focus:outline-none"
              />
              {/* Attributes List */}
              <div className="space-y-2 text-sm pl-2 pr-2 text-left">
                <div className="flex justify-between">
                  <p>Email Status:</p>
                  <p>{customerAttribute.EmailStatus || "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p>First Seen:</p>
                  <p>{customerAttribute.FirstSeenDate ? formatDate1(customerAttribute.FirstSeenDate) : "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p>Signed Up:</p>
                  <p>{customerAttribute.SignedUp || "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p>First Contacted:</p>
                  <p>
                    {customerAttribute.FirstContacted
                      ? formatDate(customerAttribute.FirstContacted)
                      : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Last Contacted:</p>
                  <p>
                    {customerAttribute.LastContacted
                      ? formatDate(customerAttribute.LastContacted)
                      : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>First Order Placed:</p>
                  <p>
                    {customerAttribute.FirstOrderPlaced
                      ? formatDate1(customerAttribute.FirstOrderPlaced)
                      : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Last Order Placed:</p>
                  <p>
                    {customerAttribute.LastOrderPlaced
                      ? formatDate1(customerAttribute.LastOrderPlaced)
                      : "N/A"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Total Order Value:</p>
                  <p>{customerAttribute.TotalOrderValue || "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p>Total Order Quantity:</p>
                  <p>{customerAttribute.TotalOrderQuantity || "N/A"}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Select a customer to view Attributes
            </p>
          )}
          {/* Bottom Card: Order Summary */}
          <div className="p-4 rounded-lg shadow-lg bg-white">
            <h3 className="font-bold text-gray-600 mb-1 pl-1">Order Summary</h3>
            {/* Search Box */}
            <div className="flex items-start justify-between">
              <input
                type="text"
                placeholder="Search Order"
                className="w-full p-2 mb-4 text-sm border rounded-sm border-gray-300 h-7 focus:outline-none"
              />
              <div className="flex items-center space-x-1 ml-2">
                <span className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded">
                  <FontAwesomeIcon icon={faArrowUp} size="sm" />
                </span>
                <span className="flex p-[0.4rem] items-center justify-center w-7 h-7 text-gray-500 bg-white border border-gray-300 rounded">
                  <FontAwesomeIcon icon={faFilter} size="sm" />
                </span>
              </div>
            </div>
            {/* Table-like Structure */}
            <div className="text-sm border border-gray-300">
              {/* Header Row */}
              <div className="grid grid-cols-3 gap-4 font-semibold bg-gray-200 p-2 border">
                <p>Date</p>
                <p>Order ID</p>
                <p>Status</p>
              </div>
              {/* Rows */}
              {/* Map over orders to display rows */}
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 gap-2 mb-1 border-t border-gray-300"
                  >
                    <p className="p-1 bg-white">
                      {order?.date_created
                        ? new Date(order.date_created).toLocaleDateString()
                        : "N/A"}
                    </p>
                    <p className="p-1 bg-white text-center">#{order?.id}</p>
                    <p
                      className={`p-1 mr-1 text-[0.8rem] bg-white font-semibold leading-tight ${
                        order?.status === "Completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order?.status}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No orders found</div>
              )}
            </div>
          </div>
          {/* Recent Activity Card */}
          <div className="bg-white shadow-md rounded-lg p-4 w-full mt-6 mb-4">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Type here..."
                className="w-full p-2 border rounded-md"
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
            <div className="relative">
              <div className="absolute left-[5.5rem] top-0 bottom-0 w-0.5 bg-gray-300"></div>
              <div className="space-y-4">
                {[
                  {
                    color: "#E0FFE0",
                    date: "25-07-23",
                    activity: "Order #101 Completed",
                  },
                  {
                    color: "#E0F7FF",
                    date: "26-07-23",
                    activity: "Order #102 Shipped",
                  },
                  {
                    color: "#F0E0FF",
                    date: "27-07-23",
                    activity: "Order #103 Processing",
                  },
                  {
                    color: "#FFF0E0",
                    date: "28-07-23",
                    activity: "Order #104 Canceled",
                  },
                  {
                    color: "#E0FFE0",
                    date: "29-07-23",
                    activity: "Order #105 Completed",
                  },
                  {
                    color: "#F0E0FF",
                    date: "30-07-23",
                    activity: "Order #106 Delivered",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 relative"
                  >
                    <div className="absolute left-20 w-4 h-4 bg-white border-2 border-gray-300 rounded-full"></div>
                    <div className="text-sm text-gray-500 ml-8">
                      {item.date}
                    </div>
                    <div
                      className="flex-1 h-8  px-6 rounded-md flex items-center justify-center text-xs text-gray-500 font-medium"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.activity}
                    </div>
                    <div className="flex space-x-1">
                      <button className="p-1">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                      <button className="p-1">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Recent Conversations Card */}
          <div className="max-w-sm mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Conversations</h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Type here..."
                className="w-full p-2 border rounded-md"
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
            <div className="space-y-4 h-64 overflow-y-auto scroll-mx-6">
              <div className="p-2 bg-gray-100 rounded">
                <div className="font-semibold">John Doe</div>
                <div className="text-sm text-gray-600">Hey, how are you?</div>
                <div className="text-xs text-gray-500">2023-10-01 10:30 AM</div>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <div className="font-semibold">Jane Smith</div>
                <div className="text-sm text-gray-600">
                  Can we reschedule our meeting?
                </div>
                <div className="text-xs text-gray-500">2023-10-01 09:15 AM</div>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <div className="font-semibold">Alice Johnson</div>
                <div className="text-sm text-gray-600">
                  Don't forget about the deadline tomorrow.
                </div>
                <div className="text-xs text-gray-500">2023-09-30 04:45 PM</div>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <div className="font-semibold">Bob Brown</div>
                <div className="text-sm text-gray-600">
                  I'll send you the documents by EOD.
                </div>
                <div className="text-xs text-gray-500">2023-09-30 02:30 PM</div>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <div className="font-semibold">Charlie Davis</div>
                <div className="text-sm text-gray-600">
                  Let's catch up over coffee.
                </div>
                <div className="text-xs text-gray-500">2023-09-29 11:00 AM</div>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <div className="font-semibold">David Wilson</div>
                <div className="text-sm text-gray-600">
                  Are you available for a call?
                </div>
                <div className="text-xs text-gray-500">2023-09-28 03:20 PM</div>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <div className="font-semibold">Emma Thomas</div>
                <div className="text-sm text-gray-600">
                  Please review the attached document.
                </div>
                <div className="text-xs text-gray-500">2023-09-27 01:10 PM</div>
              </div>
              <div className="p-2 bg-gray-100 rounded">
                <div className="font-semibold">Frank Harris</div>
                <div className="text-sm text-gray-600">
                  Meeting has been postponed.
                </div>
                <div className="text-xs text-gray-500">2023-09-26 05:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
