import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import AttributesCard from "./AttributesCard.js"; 
import OrderSummary from "./OrderSummary"; 
import RecentActivity from "./RecentActivity.js"; 
import RecentConversationsCard from "./RecentConversation.js"; 

const RightSidebar = ({ selectedCustomer, customerAttribute, orders }) => {
  return (
    <div className="w-1/5 overflow-scroll h-[87vh]">
      {" "}
      {/* Ensure full height for scrolling */}
      {selectedCustomer ? (
        <div className="mb-6 p-4 rounded-lg shadow-lg bg-white sticky top-0 z-10">
          {/* Display selected customer details */}
          <div className="flex justify-start items-center mb-4">
            <h2 className="text-[#476BA6] text-lg font-medium">
              {customerAttribute?.FirstName} {selectedCustomer?.LastName}
            </h2>

            <div className="flex space-x-2 ml-3">
              <button className="px-2 py-1 font-inter bg-[#6cbc74] text-white rounded-sm text-xs font-semibold shadow-md border-b-2 border-gray-300">
                Loyal
              </button>
              <button className="px-2 py-1 font-inter bg-[#ff9f0e] text-white rounded-sm text-xs font-semibold shadow-md border-b-2 border-gray-300">
                VIP
              </button>
            </div>
          </div>

          <div className="space-y-2 font-inter font-normal">
            <div className="flex items-center">
              <span className="w-4 h-4 mr-2 text-gray-600">
                <FontAwesomeIcon icon={faEnvelope} size="sm" />
              </span>
              <p className="text-sm pt-1 text-black">
                {customerAttribute?.EmailId || "N/A"}
              </p>
            </div>

            <div className="flex items-center">
              <span className="w-4 h-4 mr-2 text-gray-600">
                <FontAwesomeIcon icon={faPhone} size="sm" />
              </span>
              <p className="text-sm pt-2 text-black">
                {customerAttribute?.Phone || "N/A"}
              </p>
            </div>

            <div className="flex items-center">
              <span className="w-4 h-4 mr-2 text-gray-600">
                <FontAwesomeIcon icon={faMoneyBill} size="sm" />
              </span>
              <p className="text-sm pt-2 text-black">
                Total Spent: ${customerAttribute?.TotalOrderValue || "0"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mb-2 ml-1">
          Select a customer to view details
        </p>
      )}

      {/* Middle Card: Attributes */}
      <AttributesCard customerAttribute={customerAttribute} />

      {/* Bottom Card: Order Summary */}
      <OrderSummary orders={orders} />

      {/* Recent Activity Card */}
      <RecentActivity />

      {/* Recent Conversations Card */}
      <RecentConversationsCard />
    </div>
  );
};

export default RightSidebar;
