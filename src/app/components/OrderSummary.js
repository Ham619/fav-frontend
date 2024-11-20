import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faArrowUp, faFilter } from "@fortawesome/free-solid-svg-icons";

export default function OrderSummaryCard({ orders }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-4 rounded-lg shadow-lg bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600 mb-1 pl-1">Order Summary</h3>
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
          <div className="flex items-start justify-between">
            <input
              type="text"
              placeholder="Search Order"
              className="w-full p-2 mb-4 text-sm border rounded-sm border-gray-300 h-7 focus:outline-none text-black"
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
          <div className="text-xs border border-gray-300 text-black">
            {/* Header Row */}
            <div className="grid grid-cols-3 gap-4 font-semibold bg-gray-200 p-2 border">
              <p>Date</p>
              <p>Order ID</p>
              <p>Status</p>
            </div>
            {/* Rows */}
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-2 mb-1 border-t border-gray-300"
                >
                  <p className="p-1 bg-white text-[0.7rem]">
                    {order?.date_created
                      ? new Date(order.date_created).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p className="p-1 bg-white text-center text-[0.7rem]">
                    #{order?.id}
                  </p>
                  <p
                    className={`p-1 mr-1 text-[0.55rem] bg-white font-semibold leading-tight ${
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
        </>
      )}
    </div>
  );
}
