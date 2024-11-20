import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { formatDate,formatDate1 } from "../utils/dateFormat";

const AttributesCard = ({ customerAttribute }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-6 p-4 rounded-lg shadow-lg bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600 mb-1 pl-1">Attributes</h3>
        <FontAwesomeIcon
          icon={isExpanded ? faCaretUp : faCaretDown}
          className="cursor-pointer text-gray-600"
          onClick={toggleExpand}
        />
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <>
          {Object.keys(customerAttribute || {}).length === 0 ? (
            // Show this message when no customer is selected
            <p className="text-gray-500 text-center mt-4">
              Select a customer to view its attributes
            </p>
          ) : (
            <>
              {/* Search Box */}
              <input
                type="text"
                placeholder="Type here"
                className="w-full h-7 p-2 mb-3 text-sm border rounded-sm border-gray-300 focus:outline-none text-black"
              />

              {/* Attributes List */}
              <div className="space-y-2 text-sm pl-2 pr-2 text-left text-black">
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
                  <p className=" text-right"> {customerAttribute.FirstContacted ? formatDate(customerAttribute.FirstContacted) : "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p>Last Contacted:</p>
                  <p className=" text-right">{customerAttribute.LastContacted ? formatDate(customerAttribute.LastContacted) : "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p>First Order Placed:</p>
                  <p>{customerAttribute.FirstOrderPlaced ? formatDate1(customerAttribute.FirstOrderPlaced) : "N/A"}</p>
                </div>
                <div className="flex justify-between">
                  <p>Last Order Placed:</p>
                  <p>{customerAttribute.LastOrderPlaced ? formatDate1(customerAttribute.LastOrderPlaced) : "N/A"}</p>
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AttributesCard;
